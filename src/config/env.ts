import { config } from 'dotenv';
config();

const {
  PORT,
  IS_CLOUD_FUNCTION: isCloudFunctionEnv,
  RAW_ZONE_BUCKET,
} = process.env;

const IS_CLOUD_FUNCTION = isCloudFunctionEnv
  ? Boolean(JSON.parse(isCloudFunctionEnv))
  : false;

export { PORT, IS_CLOUD_FUNCTION, RAW_ZONE_BUCKET };
