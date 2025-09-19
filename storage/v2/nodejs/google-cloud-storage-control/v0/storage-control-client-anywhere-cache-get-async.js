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

const process = require('process');
const {status} = require('@grpc/grpc-js');

// [START storage_v2_storagecontrol_anywherecache_get_async]
const {StorageControlClient} = require('@google-cloud/storage-control');

const client = new StorageControlClient();

/**
 * Gets an Anywhere Cache instance.
 *
 * Anywhere Cache provides a high-performance, low-latency cache for frequently accessed data
 * in Google Cloud Storage. Retrieving its metadata allows you to inspect its configuration
 * and current state, such as its TTL, admission policy, and zone.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-123')
 * @param {string} bucketName Name of the bucket (e.g., 'my-bucket')
 * @param {string} anywhereCacheId The ID of the Anywhere Cache instance (e.g., 'my-anywhere-cache')
 * @returns {Promise<void>}
 */
async function getAnywhereCacheSample(
  projectId = 'your-project-id',
  bucketName = 'your-bucket-name',
  anywhereCacheId = 'your-anywhere-cache-id'
) {
  // Construct the full resource name for the Anywhere Cache.
  // Format: projects/{project}/buckets/{bucket}/anywhereCaches/{anywhere_cache}
  const name = client.anywhereCachePath(
    projectId,
    bucketName,
    anywhereCacheId
  );

  const request = {
    name: name,
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
        `Error: Anywhere Cache '${anywhereCacheId}' not found in bucket '${bucketName}' of project '${projectId}'.`
      );
      console.error(
        'Please ensure the Anywhere Cache ID and bucket name are correct and the cache exists.'
      );
    } else {
      console.error(`Error getting Anywhere Cache: ${err.message}`);
      // Log the full error for debugging purposes.
      console.error(err);
    }
  }
}
// [END storage_v2_storagecontrol_anywherecache_get_async]

async function main(args) {
  if (args.length < 3) {
    console.error(
      'Usage: node getAnywhereCache.js <projectId> <bucketName> <anywhereCacheId>\n'
    );
    console.error(
      'Example: node getAnywhereCache.js my-project-123 my-bucket my-anywhere-cache-id'
    );
    process.exit(1);
  }

  const projectId = args[0];
  const bucketName = args[1];
  const anywhereCacheId = args[2];

  await getAnywhereCacheSample(projectId, bucketName, anywhereCacheId);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2)).catch(err => {
    console.error(`Error in main execution: ${err.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  getAnywhereCacheSample,
};
