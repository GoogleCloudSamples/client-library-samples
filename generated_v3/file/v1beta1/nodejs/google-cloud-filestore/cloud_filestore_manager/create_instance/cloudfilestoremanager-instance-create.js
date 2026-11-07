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

// [START file_v1beta1_cloudfilestoremanager_instance_create]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Creates a Filestore instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud zone or region where the instance is located (for example, 'us-central1-c').
 * @param {string} instanceId - The ID of the instance to create (for example, 'example-filestore-instance'). Must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen.
 */
async function createInstance(projectId, locationId, instanceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const instance = {
      tier: 'BASIC_HDD',
      fileShares: [
        {
          name: 'vol1',
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

    const request = {
      parent,
      instanceId,
      instance,
    };

    // CreateInstance initiates a long-running operation
    const [operation] = await client.createInstance(request);
    const [response] = await operation.promise();

    console.log(`Created Filestore instance: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Filestore instance already exists: ${err.message}`);
    } else {
      console.error(`Failed to create Filestore instance: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createInstance };
// [END file_v1beta1_cloudfilestoremanager_instance_create]
