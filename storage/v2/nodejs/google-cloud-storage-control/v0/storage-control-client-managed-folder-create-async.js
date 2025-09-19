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

// [START storage_v2_storagecontrol_managedfolder_create_async]
const {StorageControlClient} = require('@google-cloud/storage-control').v2;
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Creates a new managed folder within a specified bucket.
 *
 * A managed folder is a hierarchical namespace feature in Google Cloud Storage.
 * It allows you to organize and manage objects within a bucket in a folder-like structure.
 * Managed folders provide a way to apply policies and permissions to a logical grouping of objects.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-123')
 * @param {string} bucketName The name of the bucket where the managed folder will be created (e.g., 'my-bucket')
 * @param {string} managedFolderId The ID of the managed folder to create (e.g., 'my-managed-folder/')
 */
async function createManagedFolder(
  projectId = 'your-project-id',
  bucketName = 'my-bucket-name',
  managedFolderId = 'my-managed-folder-to-create/'
): Promise<void> {
  // Arrange: Construct the parent path for the request.
  // This corresponds to the bucket where the managed folder will reside.
  const parent = `projects/${projectId}/buckets/${bucketName}`;

  // The managedFolder object itself can be empty for creation, as the
  // managedFolderId in the request specifies the name.
  const managedFolder = {};

  const request = {
    parent,
    managedFolder,
    managedFolderId,
  };

  try {
    // Act: Execute the API call to create the managed folder.
    const [response] = await client.createManagedFolder(request);
    // Assert: Verify the result by printing the outcome.
    console.log(
      `Managed folder ${response.name} created successfully with metageneration ${response.metageneration}.`
    );
  } catch (err) {
    // Handle specific error for already existing managed folder.
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Managed folder ${managedFolderId} already exists in bucket ${bucketName}.`
      );
    } else {
      // Handle other potential errors with a user-friendly message.
      console.error(`Error creating managed folder: ${err.message}`);
      console.error('Please check your project ID, bucket name, and ensure you have the necessary permissions.');
      // Re-throw the error to be handled by the main function's catch block.
      throw err;
    }
  }
}

// [END storage_v2_storagecontrol_managedfolder_create_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }

  const projectId = args[0];
  const bucketName = args[1];
  const managedFolderId = args[2];

  await createManagedFolder(projectId, bucketName, managedFolderId);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID like 'my-project-123'
 - Google Cloud Storage bucket name like 'my-bucket'
 - Managed folder ID like 'my-managed-folder/'

Usage:

 node createManagedFolder.js my-project-123 my-bucket my-managed-folder/
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  createManagedFolder,
};
