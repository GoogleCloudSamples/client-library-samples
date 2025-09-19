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

// Imports for the command-line runner must be before the region tag start.
const process = require('process');

// [START storage_v2_storagecontrol_managedfolders_list_async]
const { StorageControlClient } = require('@google-cloud/storage-control').v2;
const { status } = require('@grpc/grpc-js');

// The client object should be instantiated as a global variable.
const client = new StorageControlClient();

/**
 * Lists all managed folders within a specified bucket.
 *
 * Managed folders are a feature of hierarchical namespace-enabled buckets in
 * Google Cloud Storage, allowing for a folder-like structure within a bucket.
 *
 * @param {string} bucketName The name of the bucket to list managed folders from.
 *   Example: 'your-bucket-name'
 */
async function listManagedFolders(bucketName) {
  // Construct the parent resource name for the bucket.
  const parent = `projects/_/buckets/${bucketName}`;

  // Prepare the request object.
  const request = {
    parent: parent,
    // Optional: Filter results to match managed folders with names starting with this prefix.
    // If not needed, set to an empty string or omit.
    prefix: '',
  };

  try {
    console.log(
      `Attempting to list managed folders in bucket: "${bucketName}"...`,
    );

    const [managedFolders] = await client.listManagedFolders(request);

    if (managedFolders.length === 0) {
      console.log(`No managed folders found in bucket: "${bucketName}".`);
      return;
    }

    console.log('Found managed folders:');
    for (const managedFolder of managedFolders) {
      console.log(`- Name: ${managedFolder.name}`);
      if (managedFolder.createTime) {
        const createTime = new Date(
          managedFolder.createTime.seconds * 1000 +
            managedFolder.createTime.nanos / 1000000,
        );
        console.log(`\tCreate Time: ${createTime}`);
      }
      console.log(`  Metageneration: ${managedFolder.metageneration}`);
    }
    console.log(
      `Successfully listed ${managedFolders.length} managed folder(s) in bucket "${bucketName}".`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Bucket "${bucketName}" not found or does not exist. ` +
          'Please verify the bucket name is correct. ' +
          'Ensure the bucket is hierarchical namespace enabled.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied when listing managed folders in bucket "${bucketName}". ` +
          'Please ensure the authenticated service account or user has the necessary ' +
          'permissions (e.g., "storage.managedFolders.list") for this bucket.',
      );
    } else {
      console.error(`Error listing managed folders: ${err.message}`);
    }
  }
}
// [END storage_v2_storagecontrol_managedfolders_list_async]

function main(args) {
  if (args.length < 1) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  listManagedFolders(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify one argument:
 - Google Cloud Storage Bucket Name like 'your-bucket-name'
Usage:
 node storage-control-client-managed-folders-list-async.js your-bucket-name
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listManagedFolders,
};
