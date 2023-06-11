locals {
  app_name = "real-estate-funds"
}

provider "google" {}

resource "google_storage_bucket" "gcf_source" {
  name                        = "${var.project_id}-${local.app_name}-gcf-source"
  location                    = var.region
  uniform_bucket_level_access = true
  project                     = var.project_id
}

data "archive_file" "gcf_source" {
  type        = "zip"
  output_path = "/tmp/${local.app_name}-source.zip"
  source_dir  = ".."
  excludes    = ["node_modules", ".env", "terraform", "dist", "workflows"]
}

resource "google_storage_bucket_object" "gcf_source" {
  name   = "${data.archive_file.gcf_source.output_md5}.zip"
  bucket = google_storage_bucket.gcf_source.name
  source = data.archive_file.gcf_source.output_path
}

resource "google_cloudfunctions2_function" "this" {
  name     = local.app_name
  location = var.region
  project  = var.project_id

  build_config {
    runtime     = "nodejs16"
    entry_point = "cloudFunctionHandler"
    source {
      storage_source {
        bucket = google_storage_bucket.gcf_source.name
        object = google_storage_bucket_object.gcf_source.name
      }
    }
  }

  service_config {
    environment_variables = var.environment_variables
    max_instance_count = 1
    available_memory   = "256M"
    timeout_seconds    = 60
  }
}

output "function_uri" {
  value = google_cloudfunctions2_function.this.service_config[0].uri
}

resource "google_service_account" "workflows_account" {
  account_id = "${local.app_name}-workflows"
  project = var.project_id
}

resource "google_service_account" "scheduler_account" {
  account_id = "${local.app_name}-scheduler"
  project = var.project_id
}

module "workflow_funds_explorer_scraping" {
  source  = "github.com/aldo-fsm/terraform-google-cloud-workflows"
  workflow_name = "funds-explorer-scraping"
  region          = var.region
  service_account_email = google_service_account.workflows_account.email
  project_id = var.project_id
  workflow_source = file("../workflows/funds-explorer-scraping.yml")
  workflow_trigger = {
    cloud_scheduler = {
      name                  = "funds-explorer-scraping-scheduler"
      cron                  = var.scheduler_cron
      time_zone             = var.time_zone
      deadline              = "320s"
      service_account_email = google_service_account.scheduler_account.email
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "member" {
  project = google_cloudfunctions2_function.this.project
  location = google_cloudfunctions2_function.this.location
  name = google_cloudfunctions2_function.this.name
  role = "roles/run.invoker"
  member = "serviceAccount:${google_service_account.workflows_account.email}"
}

resource "google_storage_bucket_iam_member" "member" {
  bucket = var.raw_zone_bucket
  role = "roles/storage.objectCreator"
  member = "serviceAccount:${google_cloudfunctions2_function.this.service_config[0].service_account_email}"
}

resource "google_project_iam_member" "scheduler_workflow_invoker" {
  project = var.project_id
  role = "roles/workflows.invoker"
  member = "serviceAccount:${google_service_account.scheduler_account.email}"
}

