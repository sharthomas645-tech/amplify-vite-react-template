$content = @'
import { defineFunction } from "@aws-amplify/backend";

export const AttorneyUploadAPI = defineFunction({
  name: "AttorneyUploadAPI",
  entry: "./src/index.js",
  runtime: 24,
  environment: {
    BUCKET_NAME: "medlegaldocuments-west2",
    VITE_UPLOAD_PREFIX: "uploads/",
    REGION: "us-west-2",
    FRONTEND_DOMAIN: "https://hybridaimedlegal.com",
  },
});
'@

$content | Out-File -FilePath amplify/backend/functions/AttorneyUploadAPI/resource.ts -Encoding UTF8 -Force
