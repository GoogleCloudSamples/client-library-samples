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

// [START storage_v2_storagecontrol_managedfolder_delete_async]
const { StorageControlClient } = require('@google-cloud/storage-control');
const { status } = require('@grpc/grpc-js');

// Instantiate the client outside the function for reusability.
const client = new StorageControlClient();

/**
 * Deletes a managed folder.
 *
 * A managed folder is a conceptual entity within a bucket that allows you to
 * apply policies (like IAM) to a group of objects that share a common prefix.
 * This operation permanently deletes an empty managed folder.
 *
 * @param {string} bucketName The name of the bucket containing the managed folder. (e.g., 'your-bucket-name')
 * @param {string} managedFolderName The name of the managed folder to delete. Must end with a slash (e.g., 'my-managed-folder/').
 */
async function deleteManagedFolder(bucketName, managedFolderName) {
  const managedFolderPath = client.managedFolderPath(
    '_',
    bucketName,
    managedFolderName,
  );

  const request = {
    name: managedFolderPath,
    // Optional: Set to true to allow deletion of a non-empty managed folder.
    // This requires the 'storage.managedFolders.setIamPolicy' permission.
    // Use with caution, as it will delete all objects and child managed folders
    // within this managed folder.
    allowNonEmpty: true,
  };

  try {
    await client.deleteManagedFolder(request);
    console.log(
      `Managed folder ${managedFolderName} in bucket ${bucketName} deleted successfully.`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Managed folder ${managedFolderName} not found in bucket ${bucketName}. ` +
          'Please ensure the managed folder name is correct and exists.',
      );
    } else {
      console.error(`Error deleting managed folder ${managedFolderName}:`, err);
    }
  }
}
// [END storage_v2_storagecontrol_managedfolder_delete_async]

async function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  await deleteManagedFolder(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Your bucket name, e.g. 'my-bucket-name'
 - Your managed folder name, e.g. 'my-managed-folder/'
Usage:
 node storage-control-client-managed-folder-delete-async.js my-bucket-name my-managed-folder/
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteManagedFolder,
};
