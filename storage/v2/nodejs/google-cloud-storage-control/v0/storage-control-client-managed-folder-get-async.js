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

// [START storage_v2_storagecontrol_managedfolder_get_async]
const { StorageControlClient } = require('@google-cloud/storage-control');
const { status } = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Retrieves metadata for a specified managed folder.
 *
 * A managed folder is a feature in Cloud Storage that allows you to manage
 * access to a subset of objects within a bucket using IAM policies.
 *
 * @param {string} bucketName The name of the bucket (e.g., 'my-bucket')
 * @param {string} managedFolderName The name of the managed folder (e.g., 'my-managed-folder/')
 */
async function getManagedFolder(
  bucketName = 'your-bucket-name',
  managedFolderName = 'your-managed-folder/',
) {
  const name = `projects/_/buckets/${bucketName}/managedFolders/${managedFolderName}`;

  const request = {
    name: name,
  };

  try {
    const [managedFolder] = await client.getManagedFolder(request);
    console.log("Successfully retrieved managed folder:");
    console.log(`Name: ${managedFolder.name}`);
    console.log(`Metageneration: ${managedFolder.metageneration}`);
    if (managedFolder.createTime) {
      const createTime = new Date(
        managedFolder.createTime.seconds * 1000 +
          managedFolder.createTime.nanos / 1000000,
      );
      console.log(`\tCreate Time: ${createTime}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Managed folder ${managedFolderName} does not exist in bucket ${bucketName}.`,
      );
      console.error(
        'Please ensure the managed folder name is correct and it exists.',
      );
    } else {
      console.error(`Error getting managed folder ${managedFolderName}:`, err);
    }
  }
}
// [END storage_v2_storagecontrol_managedfolder_get_async]

async function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  await getManagedFolder(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify the following arguments:
 - Google Cloud Storage bucket name like 'my-bucket'
 - Managed Folder name like 'my-managed-folder/'

Usage:

 node getManagedFolder.js <bucketName> <managedFolderName>
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getManagedFolder,
};
