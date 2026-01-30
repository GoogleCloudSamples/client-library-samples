// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START storage_v2_storagecontrol_storagelayout_get]
// [START storage_storagecontrol_storagelayout_get]
// [START storage_control_quickstart_sample]
const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Retrieves the storage layout configuration for a given bucket.
 *
 * @param {string} bucketName The name of the bucket.
 *
 */
async function getStorageLayout(bucketName = 'my-bucket-name') {
  //Example: projects/_/buckets/${bucketName}/storageLayout;
  const name = client.storageLayoutPath('_', bucketName);

  const request = {
    name: name,
  };

  try {
    const [storageLayout] = await client.getStorageLayout(request);

    console.log(
      `Successfully retrieved storage layout for bucket: ${bucketName}`,
    );
    console.log(`StorageLayout Name: ${storageLayout.name}`);
    console.log(`Location: ${storageLayout.location}`);
    console.log(`Location Type: ${storageLayout.locationType}`);
    if (
      storageLayout.hierarchicalNamespace &&
      storageLayout.hierarchicalNamespace.enabled
    ) {
      console.log('Hierarchical Namespace: Enabled');
    } else {
      console.log('Hierarchical Namespace: Disabled');
    }
    if (storageLayout.customPlacementConfig) {
      console.log(
        `Custom Placement Data Locations: ${storageLayout.customPlacementConfig.dataLocations.join(
          ', ',
        )}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: StorageLayout for bucket '${bucketName}' not found.`,
      );
      console.error(
        'Please ensure the bucket exists and you have the necessary permissions.',
      );
    } else {
      console.error(`Error getting storage layout:`, err);
    }
  }
}
// [END storage_control_quickstart_sample]
// [END storage_storagecontrol_storagelayout_get]
// [END storage_v2_storagecontrol_storagelayout_get]

module.exports = {
  getStorageLayout,
};
