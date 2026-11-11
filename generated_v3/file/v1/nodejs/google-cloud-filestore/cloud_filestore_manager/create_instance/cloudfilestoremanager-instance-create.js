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

// [START file_v1_cloudfilestoremanager_instance_create]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Creates a Filestore instance in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud zone where the instance is located (for example, 'us-central1-c'). Filestore instance locations map to Google Cloud zones.
 * @param {string} instanceId - The caller-chosen ID to use for the instance (for example, 'example-filestore-instance'). Must be unique within the specified project and location.
 */
async function createInstance(projectId, locationId, instanceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const instance = {
      tier: 'BASIC_HDD',
      fileShares: [
        {
          name: 'fileshare',
          capacityGb: 1024,
        },
      ],
      networks: [
        {
          network: 'default',
          modes: ['MODE_IPV4'],
        },
      ],
    };

    const [operation] = await client.createInstance({
      parent,
      instanceId,
      instance,
    });

    const [response] = await operation.promise();
    console.log(`Filestore instance created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Filestore instance already exists: ${instanceId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error('Failed to create instance:', err);
    }
  }
}

module.exports = { createInstance };
// [END file_v1_cloudfilestoremanager_instance_create]
