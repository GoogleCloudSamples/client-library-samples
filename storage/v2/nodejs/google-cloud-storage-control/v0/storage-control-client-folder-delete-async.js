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

"use strict";

// [START storage_v2_storagecontrol_folder_delete_async]
const { StorageControlClient } = require("@google-cloud/storage-control").v2;
const { status } = require("@grpc/grpc-js");
const gax = require("google-gax");

const client = new StorageControlClient();

/**
 * Permanently deletes an empty folder in a hierarchical namespace enabled bucket.
 * This operation is only applicable to a hierarchical namespace enabled bucket.
 *
 * @param {string} [bucketName="your-bucket-name"] The name of the bucket.
 * @param {string} [folderPath="your-folder/to/delete/"] The full path of the folder to delete, ending with a slash.
 */
async function deleteFolder(
  bucketName = "your-bucket-name",
  folderPath = "your-folder/to/delete/"
) {
  const name = `projects/_/buckets/${bucketName}/folders/${folderPath}`;

  const request = {
    name,
    // Optional: Add ifMetagenerationMatch or ifMetagenerationNotMatch for conditional deletion.
    // ifMetagenerationMatch: 1,
    // ifMetagenerationNotMatch: 2,
    requestId: gax.makeUUID(), // Optional: A unique identifier for this request for idempotency
  };

  try {
    await client.deleteFolder(request);
    console.log(
      `Folder ${folderPath} deleted successfully from bucket ${bucketName}.`
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Folder ${folderPath} not found in bucket ${bucketName}. It might have already been deleted.`
      );
    } else if (err.code === status.FAILED_PRECONDITION) {
      // This error typically means the folder is not empty.
      console.log(
        `Folder ${folderPath} is not empty or conditional deletion failed. Please ensure the folder is empty before deleting.`
      );
    } else {
      console.error(`Error deleting folder ${folderPath}:`, err);
    }
  }
}
// [END storage_v2_storagecontrol_folder_delete_async]

function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const bucketName = args[0];
  const folderPath = args[1];
  deleteFolder(bucketName, folderPath);
}

if (require.main === module) {
  process.on("uncaughtException", (err) => {
    console.error(`Error running sample: ${err.message}`);
    const path = require("path");
    const fileName = path.basename(__filename);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Bucket Name like 'my-bucket-name'
 - Google Cloud Folder Name like 'my-folder-name/'

Usage:
 node ${fileName} my-bucket-name my-folder-name/`);

    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = { deleteFolder };
