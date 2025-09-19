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
const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Lists all Anywhere Cache instances for a given bucket.
 *
 * Anywhere Cache provides a way to cache frequently accessed objects closer to
 * your applications, reducing latency and egress costs.
 *
 * @param {string} projectId Your Google Cloud Project ID.
 * @param {string} bucketName The name of the bucket to list Anywhere Caches for.
 */
async function listAnywhereCaches(projectId, bucketName) {
  // Arrange: Construct the parent resource name for the bucket.
  const parent = `projects/${projectId}/buckets/${bucketName}`;

  const request = {
    parent: parent,
  };

  try {
    // Act: Send the request and get the list of Anywhere Caches.
    const [anywhereCaches] = await client.listAnywhereCaches(request);

    // Assert: Print the results.
    if (anywhereCaches.length === 0) {
      console.log(`No Anywhere Caches found for bucket ${bucketName} in project ${projectId}.`);
      return;
    }

    console.log('Anywhere Caches:');
    for (const cache of anywhereCaches) {
      console.log(`- Name: ${cache.name}`);
      console.log(`  Zone: ${cache.zone}`);
      console.log(`  State: ${cache.state}`);
      console.log(`  TTL: ${cache.ttl ? cache.ttl.seconds + 's' : 'N/A'}`);
      console.log(`  Admission Policy: ${cache.admissionPolicy || 'N/A'}`);
      console.log(`  Created: ${cache.createTime ? cache.createTime.toDate() : 'N/A'}`);
    }
  } catch (err) {
    // Handle specific API errors.
    if (err.code === status.NOT_FOUND) {
      console.error(`Error: The specified bucket '${bucketName}' or project '${projectId}' was not found.`);
      console.error('Please ensure the bucket exists and is accessible within the project.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Error: Permission denied. Ensure the service account has the necessary permissions (e.g., storage.anywhereCaches.list) for bucket '${bucketName}'.`);
    } else {
      // Catch any other unexpected errors.
      console.error('Error listing Anywhere Caches:', err.message);
    }
  }
}
// [END storage_v2_storagecontrol_anywherecaches_list_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }

  const projectId = args[0];
  const bucketName = args[1];

  await listAnywhereCaches(projectId, bucketName);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Storage Bucket Name like 'my-bucket-name'

Usage:

  node listAnywhereCaches.js my-project-id my-bucket-name
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2)).catch(err => {
    console.error(`Error running sample: ${err.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  listAnywhereCaches,
};
