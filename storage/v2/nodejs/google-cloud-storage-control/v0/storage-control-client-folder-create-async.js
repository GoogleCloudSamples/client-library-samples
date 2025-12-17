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

// [START storage_v2_storagecontrol_create_folder_async]
const { StorageControlClient } = require("@google-cloud/storage-control");
const { status } = require("@grpc/grpc-js");

const client = new StorageControlClient();

/**
 * Creates a new folder within a specified bucket.
 *
 * @param {string} bucketName The name of the bucket in which to create the folder.
 *   The bucket must have hierarchical namespace enabled. Example: 'my-bucket'
 * @param {string} folderId The full path of the folder to create, including all parent folders,
 *   ending with a slash. Example: 'my-folder/sub-folder/'
 */
async function createFolder(bucketName, folderId) {
  // Construct the parent path for the request.
  const parent = `projects/_/buckets/${bucketName}`;

  // The folder object to be created. The `name` field is not set here;
  // it's derived from `parent` and `folderId` in the request.
  const folder = {};

  const request = {
    parent: parent,
    folder: folder,
    folderId: folderId,
    // Optional: Set to true to create missing ancestor folders automatically.
    recursive: true,
  };

  try {
    const [response] = await client.createFolder(request);
    console.log(`Folder ${response.name} created successfully.`);
    console.log(`Metageneration: ${response.metageneration}`);
    if (folder.createTime) {
      const createTime = new Date(
        folder.createTime.seconds * 1000 + folder.createTime.nanos / 1000000
      );
      console.log(`\tCreate Time: ${createTime}`);
    }
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(`Folder ${folderId} already exists in bucket ${bucketName}.`);
    } else {
      console.error("Error creating folder:", err);
    }
  }
}
// [END storage_v2_storagecontrol_create_folder_async]

function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const bucketName = args[0];
  const folderId = args[1];

  createFolder(bucketName, folderId);
}

if (require.main === module) {
  process.on("uncaughtException", (err) => {
    console.error(`Error running sample: ${err.message}`);
    const path = require("path");
    const fileName = path.basename(__filename);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Bucket Name (e.g., 'your-bucket-name')
 - Folder ID (e.g., 'my-folder/sub-folder/')

Usage:

 node ${fileName} your-bucket-name my-folder/sub-folder/
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  createFolder,
};
