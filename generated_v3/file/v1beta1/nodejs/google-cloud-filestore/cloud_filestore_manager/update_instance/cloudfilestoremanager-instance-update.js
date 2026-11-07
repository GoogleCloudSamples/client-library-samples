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

// [START file_v1beta1_cloudfilestoremanager_instance_update]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Use the updateInstance method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (zone or region) for the Filestore instance, e.g., 'us-central1-c' or 'us-central1'.
 * @param {string} instanceId - The ID of the Filestore instance to update.
 */
async function updateInstance(projectId, locationId, instanceId) {
  try {
    const instanceName = `projects/${projectId}/locations/${locationId}/instances/${instanceId}`;

    const instance = {
      name: instanceName,
      description: 'Updated description.',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      instance,
      updateMask,
    };

    // UpdateInstance initiates a long-running operation.
    const [operation] = await client.updateInstance(request);
    const [response] = await operation.promise();

    console.log(`Updated instance: ${response.name}`);
    console.log(`State: ${response.state}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Instance state precondition failed: ${err.message}`);
    } else {
      console.error(`Update failed with gRPC status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateInstance };
// [END file_v1beta1_cloudfilestoremanager_instance_update]
