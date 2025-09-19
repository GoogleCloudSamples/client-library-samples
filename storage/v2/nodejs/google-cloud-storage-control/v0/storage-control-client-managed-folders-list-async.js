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
const {StorageControlClient} = require('@google-cloud/storage-control').v2;
const {status} = require('@grpc/grpc-js');

// The client object should be instantiated as a global variable.
const client = new StorageControlClient();

/**
 * Lists all managed folders within a specified bucket.
 *
 * Managed folders are a feature of hierarchical namespace-enabled buckets in
 * Google Cloud Storage, allowing for a folder-like structure within a bucket.
 *
 * @param {string} projectId The ID of your Google Cloud project.
 *   Example: 'your-project-id'
 * @param {string} bucketName The name of the bucket to list managed folders from.
 *   Example: 'your-bucket-name'
 */
async function listManagedFolders(projectId, bucketName) {
  // Construct the parent resource name for the bucket.
  const parent = `projects/${projectId}/buckets/${bucketName}`;

  // Prepare the request object.
  const request = {
    parent: parent,
    // Optional: Specify the maximum number of managed folders to return per page.
    // The service will use this parameter or 1,000 items, whichever is smaller.
    pageSize: 10,
    // Optional: Filter results to match managed folders with names starting with this prefix.
    // If not needed, set to an empty string or omit.
    prefix: '',
  };

  try {
    console.log(`Attempting to list managed folders in bucket: "${bucketName}"...`);

    // Act: Execute the API call.
    // The .iterateAll() method handles pagination automatically, returning all
    // results as a single array. For large result sets, consider using
    // .listManagedFoldersAsync() for an async iterable to process results page by page.
    const [managedFolders] = await client.listManagedFolders(request);

    // Assert: Process and print the results.
    if (managedFolders.length === 0) {
      console.log(`No managed folders found in bucket: "${bucketName}".`);
      return;
    }

    console.log('Found managed folders:');
    for (const managedFolder of managedFolders) {
      console.log(`- Name: ${managedFolder.name}`);
      // Convert protobuf Timestamp to JavaScript Date object for readability.
      console.log(`  Created: ${managedFolder.createTime?.toDate()}`);
      console.log(`  Metageneration: ${managedFolder.metageneration}`);
    }
    console.log(`Successfully listed ${managedFolders.length} managed folder(s) in bucket "${bucketName}".`);
  } catch (err) {
    // Error Handling: Catch specific API errors and provide actionable messages.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Bucket "${bucketName}" not found or does not exist for project "${projectId}". ` +
        `Please verify the bucket name and project ID are correct. ` +
        `Ensure the bucket is hierarchical namespace enabled.`
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied when listing managed folders in bucket "${bucketName}". ` +
        `Please ensure the authenticated service account or user has the necessary ` +
        `permissions (e.g., "storage.managedFolders.list") for this bucket.`
      );
    } else {
      // Log other unexpected errors with their full message for debugging.
      console.error(`Error listing managed folders: ${err.message}`);
      // For production applications, you might want to re-throw the error
      // or implement more sophisticated logging/alerting.
    }
  }
}
// [END storage_v2_storagecontrol_managedfolders_list_async]

/**
 * Main function to parse command-line arguments and run the sample.
 * @param {string[]} args Command-line arguments.
 */
function main(args) {
  if (args.length < 2) {
    // Throw an error if insufficient arguments are provided, to be caught by the unhandledRejection handler.
    throw new Error('Usage: node listManagedFolders.js <projectId> <bucketName>');
  }
  const projectId = args[0];
  const bucketName = args[1];
  listManagedFolders(projectId, bucketName);
}

// This ensures that the `main` function is called only when the script is executed directly.
if (require.main === module) {
  // Set up a global unhandled rejection handler to catch errors from async operations.
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    // Provide more detailed usage instructions if the error is related to arguments.
    if (err.message.includes('Usage:')) {
      console.error(`\nTo run this sample from the command-line, specify two arguments:\n - Google Cloud Project ID (e.g., 'your-project-id')\n - Google Cloud Storage Bucket Name (e.g., 'your-bucket-name')`);
    }
    process.exitCode = 1; // Indicate an error exit.
  });

  // Call the main function with command-line arguments (excluding 'node' and the script name).
  main(process.argv.slice(2));
}

// Export the function for testing or use in other modules.
module.exports = {
  listManagedFolders,
};
