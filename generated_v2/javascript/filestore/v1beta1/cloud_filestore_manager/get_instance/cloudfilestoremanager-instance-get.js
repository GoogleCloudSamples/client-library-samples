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

// [START file_v1beta1_cloudfilestoremanager_instance_get]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Retrieves details of a specific Filestore instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location of the Filestore instance (for example, 'us-central1-c' or 'us-central1').
 * @param {string} instanceId - The identifier of the Filestore instance to retrieve (for example, 'example-instance-id').
 */
async function getInstance(projectId, locationId, instanceId) {
  const name = `projects/${projectId}/locations/${locationId}/instances/${instanceId}`;

  try {
    const request = {
      name,
    };

    const [instance] = await client.getInstance(request);

    console.log(`Instance Name: ${instance.name}`);
    console.log(`State: ${instance.state}`);
    console.log(`Tier: ${instance.tier}`);
    console.log(`Create Time: ${instance.createTime ? instance.createTime.seconds : 'N/A'}`);

    return instance;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Filestore instance not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing Filestore instance: ${name}`);
    } else {
      console.error(`Error retrieving Filestore instance ${name}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getInstance };
// [END file_v1beta1_cloudfilestoremanager_instance_get]
