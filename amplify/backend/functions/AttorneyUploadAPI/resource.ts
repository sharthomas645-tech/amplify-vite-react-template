import { defineFunction } from "@aws-amplify/backend";

export const AttorneyUploadAPI = defineFunction({
  name: "AttorneyUploadAPI",
  entry: "./src/index.ts",
  runtime: 24,
  build: {
    esbuildConfig: {
      external: [
        "@aws-sdk/client-s3",
        "@aws-sdk/s3-request-presigner"
      ]
    }
  },
  environment: {
    BUCKET_NAME: "medlegaldocuments-west2",
    VITE_UPLOAD_PREFIX: "uploads/",
    REGION: "us-west-2",
    FRONTEND_DOMAIN: "https://hybridaimedlegal.com",
  },
});
