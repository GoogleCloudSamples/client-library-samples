// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START cloudfunctions_v1_cloudfunctionsservice_generate_upload_url]
'use strict';

const {CloudFunctionsServiceClient} = require('@google-cloud/functions');
const {status} = require('@grpc/grpc-js');

const client = new CloudFunctionsServiceClient();

/**
 * Generates a signed upload URL for source code deployment.
 */
async function generateUploadUrl() {
  const projectId = await client.getProjectId();
  const location = 'us-central1';

  const parent = client.locationPath(projectId, location);
  const request = {
    parent,
  };

  try {
    const [response] = await client.generateUploadUrl(request);
    console.log(`Upload URL generated: ${response.uploadUrl}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code !== undefined) {
      console.error(`API Error (code ${err.code}):`, err.message);
    }
  }
}

module.exports = { generateUploadUrl };
// [END cloudfunctions_v1_cloudfunctionsservice_generate_upload_url]
