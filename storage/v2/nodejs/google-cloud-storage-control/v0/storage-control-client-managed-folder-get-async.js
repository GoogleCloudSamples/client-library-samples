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
const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Retrieves metadata for a specified managed folder.
 *
 * A managed folder is a feature in Cloud Storage that allows you to manage
 * access to a subset of objects within a bucket using IAM policies.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'your-project-id')
 * @param {string} bucketName The name of the bucket (e.g., 'my-bucket')
 * @param {string} managedFolderName The name of the managed folder (e.g., 'my-managed-folder/')
 */
async function getManagedFolder(
  projectId = 'your-project-id',
  bucketName = 'your-bucket-name',
  managedFolderName = 'your-managed-folder/'
) {
  const name = `projects/${projectId}/buckets/${bucketName}/managedFolders/${managedFolderName}`;

  const request = {
    name: name,
  };

  try {
    const [managedFolder] = await client.getManagedFolder(request);
    console.log(`Successfully retrieved managed folder:`);
    console.log(`Name: ${managedFolder.name}`);
    console.log(`Metageneration: ${managedFolder.metageneration}`);
    console.log(`Create Time: ${managedFolder.createTime?.toDate()}`);
    console.log(`Update Time: ${managedFolder.updateTime?.toDate()}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Managed folder ${managedFolderName} does not exist in bucket ${bucketName} of project ${projectId}.`
      );
      console.error(
        'Please ensure the managed folder name is correct and it exists.'
      );
    } else {
      console.error(`Error getting managed folder ${managedFolderName}:`, err);
    }
  }
}
// [END storage_v2_storagecontrol_managedfolder_get_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  await getManagedFolder(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'your-project-id'
 - Google Cloud Storage bucket name like 'my-bucket'
 - Managed Folder name like 'my-managed-folder/'

Usage:

 node getManagedFolder.js <projectId> <bucketName> <managedFolderName>
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getManagedFolder,
};
