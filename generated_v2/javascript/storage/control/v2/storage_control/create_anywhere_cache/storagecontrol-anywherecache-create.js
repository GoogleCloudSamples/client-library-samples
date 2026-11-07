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

// [START storage_v2_storagecontrol_anywherecache_create]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Use the createAnywhereCache method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id'). This is a caller-assigned identifier.
 * @param {string} bucketId - The ID of the Cloud Storage bucket (for example, 'example-bucket-id'). The bucket must already exist.
 */
async function createAnywhereCache(projectId, bucketId) {
  try {
    const parent = `projects/${projectId}/buckets/${bucketId}`;
    const anywhereCache = {
      zone: 'us-central1-a',
    };

    const [operation] = await client.createAnywhereCache({
      parent,
      anywhereCache,
    });

    const [response] = await operation.promise();

    console.log(`Created Anywhere Cache: ${response.name}`);
    console.log(`Zone: ${response.zone}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Anywhere Cache already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createAnywhereCache };
// [END storage_v2_storagecontrol_anywherecache_create]
