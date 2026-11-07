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

// [START netapp_v1_netapp_execute_ontap_post]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Use the executeOntapPost method
 *
 * @param {string} locationId - The Google Cloud region where the NetApp storage pool resides (for example, 'us-central1').
 * @param {string} storagePoolId - The ID of the NetApp StoragePool (for example, 'example-storage-pool').
 * @param {string} projectId - The ID of the Google Cloud project.
 */
async function executeOntapPost(locationId, storagePoolId, projectId) {
  try {
    const body = {
      fields: {
        name: {
          stringValue: 'example-volume',
        },
      },
    };
    const ontapPath = 'api/storage/volumes';

    const storagePool = client.storagePoolPath(
      projectId,
      locationId,
      storagePoolId
    );

    const request = {
      storagePool,
      ontapPath,
      body,
    };

    const [response] = await client.executeOntapPost(request);
    console.log('ONTAP POST execution succeeded:');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { executeOntapPost };
// [END netapp_v1_netapp_execute_ontap_post]
