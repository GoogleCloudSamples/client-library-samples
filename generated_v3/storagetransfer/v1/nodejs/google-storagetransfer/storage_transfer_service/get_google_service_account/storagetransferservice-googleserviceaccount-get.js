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

// [START storagetransfer_v1_storagetransferservice_googleserviceaccount_get]
'use strict';

const {StorageTransferServiceClient} = require('@google-cloud/storage-transfer');
const {status} = require('@grpc/grpc-js');

const client = new StorageTransferServiceClient();

/**
 * Retrieves the Google-managed service account for Storage Transfer Service.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function getGoogleServiceAccount(projectId) {
  try {
    const request = {
      projectId,
    };

    const [serviceAccount] = await client.getGoogleServiceAccount(request);
    console.log(`Retrieved Storage Transfer Service account: ${serviceAccount.accountEmail}`);
    return serviceAccount;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${projectId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for project: ${projectId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request arguments: ${err.message}`);
    } else {
      console.error(`Request failed with status code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getGoogleServiceAccount };
// [END storagetransfer_v1_storagetransferservice_googleserviceaccount_get]
