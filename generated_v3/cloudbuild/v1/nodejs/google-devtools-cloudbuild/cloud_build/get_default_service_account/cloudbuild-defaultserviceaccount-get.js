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

// [START cloudbuild_v1_cloudbuild_defaultserviceaccount_get]
'use strict';

const {CloudBuildClient} = require('@google-cloud/cloudbuild');
const {status} = require('@grpc/grpc-js');

const client = new CloudBuildClient();

/**
 * Use the getDefaultServiceAccount method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function getDefaultServiceAccount(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/defaultServiceAccount`;
    const request = {
      name,
    };

    const [response] = await client.getDefaultServiceAccount(request);
    console.log(`Default service account name: ${response.name}`);
    console.log(`Service account email: ${response.serviceAccountEmail}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Default service account not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to get default service account: ${err.message}`);
    }
  }
}

module.exports = { getDefaultServiceAccount };
// [END cloudbuild_v1_cloudbuild_defaultserviceaccount_get]
