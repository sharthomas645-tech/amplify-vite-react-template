import { defineFunction } from "@aws-amplify/backend";
import { NodeVersion } from "@aws-amplify/backend-function";

export const AttorneyUploadAPI = defineFunction({
  name: "AttorneyUploadAPI",
  entry: "./src/index.js",
  runtime: NodeVersion.NODE_24,
  build: {
    esbuildConfig: {
      external: [
        "@aws-sdk/client-s3",
        "@aws-sdk/s3-request-presigner"
      ],
      logLevel: "info"
    }
  },
  environment: {
    BUCKET_NAME: "medlegaldocuments-west2",
    VITE_UPLOAD_PREFIX: "uploads/",
    REGION: "us-west-2",
    FRONTEND_DOMAIN: "https://hybridaimedlegal.com",
  },
});
