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

// Imports for the command-line runner ('process') must be before the region tag start.
const process = require('process');

// [START storage_v2_storagecontrol_managedfolder_delete_async]
const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

// Instantiate the client outside the function for reusability.
const client = new StorageControlClient();

/**
 * Deletes a managed folder.
 *
 * A managed folder is a conceptual entity within a bucket that allows you to
 * apply policies (like IAM) to a group of objects that share a common prefix.
 * This operation permanently deletes an empty managed folder.
 *
 * @param {string} [projectId='nodejs-docs-samples'] Your Google Cloud Project ID. (e.g., 'your-project-id')
 * @param {string} [bucketName='gcs-control-nodejs-samples'] The name of the bucket containing the managed folder. (e.g., 'your-bucket-name')
 * @param {string} [managedFolderName='test-managed-folder/'] The name of the managed folder to delete. Must end with a slash (e.g., 'my-managed-folder/').
 */
async function deleteManagedFolder(
  projectId = 'nodejs-docs-samples',
  bucketName = 'gcs-control-nodejs-samples',
  managedFolderName = 'test-managed-folder/'
) {
  const name = `projects/${projectId}/buckets/${bucketName}/managedFolders/${managedFolderName}`;

  const request = {
    name: name,
    // Optional: Set to true to allow deletion of a non-empty managed folder.
    // This requires the 'storage.managedFolders.setIamPolicy' permission.
    // Use with caution, as it will delete all objects and child managed folders
    // within this managed folder.
    allowNonEmpty: false,
    // Optional: A unique identifier for this request. UUID is the recommended
    // format, but other formats are still accepted. This request is only
    // idempotent if a `request_id` is provided.
    // requestId: 'your-unique-request-id', // Uncomment and set if idempotency is needed
  };

  try {
    await client.deleteManagedFolder(request);
    console.log(`Managed folder ${managedFolderName} in bucket ${bucketName} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Managed folder ${managedFolderName} not found in bucket ${bucketName}. ` +
        `Please ensure the managed folder name is correct and exists.`
      );
    } else if (err.code === status.FAILED_PRECONDITION && err.details && err.details.includes('folder is not empty')) {
      console.error(
        `Error: Managed folder ${managedFolderName} is not empty. ` +
        `To delete a non-empty managed folder, set 'allowNonEmpty' to true in the request ` +
        `and ensure your service account has the 'storage.managedFolders.setIamPolicy' permission.`
      );
      console.error(err);
    } else {
      console.error(`Error deleting managed folder ${managedFolderName}:`, err);
    }
  }
}
// [END storage_v2_storagecontrol_managedfolder_delete_async]

// Main function to be command-line runnable
async function main(args) {
  // Use provided arguments or the default hard-coded values from the function signature.
  const projectId = args[0];
  const bucketName = args[1];
  const managedFolderName = args[2];

  if (args.length < 3) {
    console.warn(`
      Using default values for projectId, bucketName, and managedFolderName.
      To specify your own, run:
      node ${process.argv[1]} <YOUR_PROJECT_ID> <YOUR_BUCKET_NAME> <YOUR_MANAGED_FOLDER_NAME>
      Example: node ${process.argv[1]} my-project-id my-bucket-name my-managed-folder/
    `);
  }

  await deleteManagedFolder(projectId, bucketName, managedFolderName);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteManagedFolder,
};
