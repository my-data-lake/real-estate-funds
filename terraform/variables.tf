variable "project_id" {
  description = "ID of the project"
  type        = string
  nullable    = false
}

variable "region" {
  description = "Region for the cloud functions"
  type        = string
  nullable    = false
}

variable "raw_zone_bucket" {
  description = "Raw zone bucket name"
  type        = string
  nullable    = false
}

variable "time_zone" {
  description = "Time zone for the cloud scheduler"
  type        = string
  nullable    = false
}

variable "scheduler_cron" {
  description = "Cron expresion for the cloud scheduler"
  type        = string
  nullable    = false
}

variable "environment_variables" {
  description = "Environment variables for the cloud function"
  type        = map(string)
  nullable    = false
}
