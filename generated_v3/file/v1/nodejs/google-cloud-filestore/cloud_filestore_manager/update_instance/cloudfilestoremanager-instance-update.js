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

// [START file_v1_cloudfilestoremanager_instance_update]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Updates a Filestore instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (zone) of the Filestore instance (for example, 'us-central1-c').
 * @param {string} instanceId - The ID of the Filestore instance to update.
 */
async function updateInstance(projectId, locationId, instanceId) {
  try {
    const instance = {
      name: `projects/${projectId}/locations/${locationId}/instances/${instanceId}`,
      description: 'Updated Filestore instance description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      instance,
      updateMask,
    };

    const [operation] = await client.updateInstance(request);
    const [response] = await operation.promise();

    console.log(`Updated instance: ${response.name}`);
    console.log(`State: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Filestore instance was not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateInstance };
// [END file_v1_cloudfilestoremanager_instance_update]
