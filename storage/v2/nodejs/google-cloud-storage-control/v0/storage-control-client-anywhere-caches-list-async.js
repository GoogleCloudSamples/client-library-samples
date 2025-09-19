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

// [START storage_v2_storagecontrol_anywherecaches_list_async]
const { StorageControlClient } = require('@google-cloud/storage-control');
const { status } = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Lists all Anywhere Cache instances for a given bucket.
 *
 * Anywhere Cache provides a way to cache frequently accessed objects closer to
 * your applications, reducing latency and egress costs.
 *
 * @param {string} bucketName The name of the bucket to list Anywhere Caches for.
 */
async function listAnywhereCaches(bucketName) {
  // Arrange: Construct the parent resource name for the bucket.
  const parent = `projects/_/buckets/${bucketName}`;

  const request = {
    parent: parent,
  };

  try {
    const [anywhereCaches] = await client.listAnywhereCaches(request);

    if (anywhereCaches.length === 0) {
      console.log(`No Anywhere Caches found for bucket ${bucketName}.`);
      return;
    }

    console.log('Anywhere Caches:');
    for (const cache of anywhereCaches) {
      console.log(`- Name: ${cache.name}`);
      console.log(`  Zone: ${cache.zone}`);
      console.log(`  State: ${cache.state}`);
      console.log(`  TTL: ${cache.ttl ? cache.ttl.seconds + 's' : 'N/A'}`);
      console.log(`  Admission Policy: ${cache.admissionPolicy || 'N/A'}`);
      if (cache.createTime) {
        const createTime = new Date(
          cache.createTime.seconds * 1000 + cache.createTime.nanos / 1000000,
        );
        console.log(`  Create Time: ${createTime}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified bucket '${bucketName}' was not found.`,
      );
      console.error(
        'Please ensure the bucket exists and is accessible within the project.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied. Ensure the service account has the necessary permissions (e.g., storage.anywhereCaches.list) for bucket '${bucketName}'.`,
      );
    } else {
      console.error('Error listing Anywhere Caches:', err.message);
    }
  }
}
// [END storage_v2_storagecontrol_anywherecaches_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(`Expected 1 argument, but got ${args.length}.`);
  }
  const bucketName = args[0];
  await listAnywhereCaches(bucketName);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify these arguments:
 - Google Cloud Storage Bucket Name like 'my-bucket-name'

Usage:

  node storage-control-client-anywhere-caches-list-async.js <bucket-name>
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2)).catch((err) => {
    console.error(`Error running sample: ${err.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  listAnywhereCaches,
};
