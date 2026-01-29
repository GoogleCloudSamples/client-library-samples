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

const {status} = require('@grpc/grpc-js');

// [START storage_v2_storagecontrol_anywherecache_get]
// [START storage_storagecontrol_anywherecache_get]
// [START storage_control_get_anywhere_cache]
const {StorageControlClient} = require('@google-cloud/storage-control');

const client = new StorageControlClient();

/**
 * Gets an Anywhere Cache instance.
 *
 * @param {string} bucketName Name of the bucket (e.g., 'my-bucket')
 * @param {string} anywhereCacheZone The zone of the Anywhere Cache instance (e.g., 'us-central1-a')
 */
async function getAnywhereCacheSample(
  bucketName,
  anywhereCacheZone = 'us-central1-a',
) {
  const name = client.anywhereCachePath('_', bucketName, anywhereCacheZone);

  const request = {
    name,
  };

  try {
    const [anywhereCache] = await client.getAnywhereCache(request);
    console.log(`Anywhere Cache ${anywhereCache.name} retrieved successfully.`);
    console.log(`  State: ${anywhereCache.state}`);
    console.log(`  TTL: ${anywhereCache.ttl?.seconds} seconds`);
    console.log(`  Admission Policy: ${anywhereCache.admissionPolicy}`);
    console.log(`  Zone: ${anywhereCache.zone}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Anywhere Cache in zone '${anywhereCacheZone}' not found in bucket '${bucketName}'.`,
      );
      console.error(
        'Please ensure the Anywhere Cache zone and bucket name are correct and the cache exists.',
      );
    } else {
      console.error(`Error getting Anywhere Cache: ${err.message}`);
      console.error(err);
    }
  }
}
// [END storage_control_get_anywhere_cache]
// [END storage_storagecontrol_anywherecache_get]
// [END storage_v2_storagecontrol_anywherecache_get]

module.exports = {
  getAnywhereCacheSample,
};
