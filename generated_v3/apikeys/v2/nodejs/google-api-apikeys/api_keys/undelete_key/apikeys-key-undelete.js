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

// [START apikeys_v2_apikeys_undelete_key]
'use strict';

const {ApiKeysClient} = require('@google-cloud/apikeys');
const {status} = require('@grpc/grpc-js');

const client = new ApiKeysClient();

/**
 * Undeletes a soft-deleted API key.
 *
 * @param {string} projectId - The Google Cloud project ID owning the API key.
 * @param {string} locationId - The location of the API key. API keys are global resources; the only supported value is 'global'.
 * @param {string} keyId - The ID of the deleted API key to undelete.
 */
async function undeleteKey(projectId, locationId, keyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/keys/${keyId}`;
    const request = {
      name,
    };

    // UndeleteKey returns a long-running operation
    const [operation] = await client.undeleteKey(request);
    const [response] = await operation.promise();

    console.log(`Undeleted key: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Key not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation failed precondition: ${err.message}`);
    } else {
      console.error(`API error (code ${err.code}): ${err.message}`);
    }
    throw err;
  }
}

module.exports = { undeleteKey };
// [END apikeys_v2_apikeys_undelete_key]
