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

const process = require("process");

// [START storage_v2_storagecontrol_storagelayout_get_async]
const { StorageControlClient } = require("@google-cloud/storage-control");
const { status } = require("@grpc/grpc-js");

const client = new StorageControlClient();

/**
 * Retrieves the storage layout configuration for a given bucket.
 *
 * The storage layout provides information about the bucket's location, location type,
 * custom placement configuration, and hierarchical namespace status.
 *
 * @param {string} bucketName The name of the bucket.
 * @example
 * ```
 * getStorageLayout('my-bucket-name');
 * ```
 */
async function getStorageLayout(bucketName = "my-bucket-name") {
  const name = `projects/_/buckets/${bucketName}/storageLayout`;

  const request = {
    name: name,
  };

  try {
    const [storageLayout] = await client.getStorageLayout(request);

    console.log(
      `Successfully retrieved storage layout for bucket: ${bucketName}`
    );
    console.log(`StorageLayout Name: ${storageLayout.name}`);
    console.log(`Location: ${storageLayout.location}`);
    console.log(`Location Type: ${storageLayout.locationType}`);
    if (
      storageLayout.hierarchicalNamespace &&
      storageLayout.hierarchicalNamespace.enabled
    ) {
      console.log("Hierarchical Namespace: Enabled");
    } else {
      console.log("Hierarchical Namespace: Disabled");
    }
    if (storageLayout.customPlacementConfig) {
      console.log(
        `Custom Placement Data Locations: ${storageLayout.customPlacementConfig.dataLocations.join(
          ", "
        )}`
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: StorageLayout for bucket '${bucketName}' not found.`
      );
      console.error(
        "Please ensure the bucket exists and you have the necessary permissions."
      );
    } else {
      console.error(`Error getting storage layout: ${err.message}`);
    }
    process.exitCode = 1;
  }
}
// [END storage_v2_storagecontrol_storagelayout_get_async]

async function main(args) {
  if (args.length !== 1) {
    console.error("Usage: node getStorageLayout.js <bucketName>");
    process.exit(1);
  }
  const bucketName = args[0];
  await getStorageLayout(bucketName);
}

if (require.main === module) {
  process.on("uncaughtException", (err) => {
    console.error(`Error running sample: ${err.message}`);
    const path = require("path");
    const fileName = path.basename(__filename);
    console.error(`To run this sample from the command-line, specify one argument:
  - Google Cloud Storage Bucket Name like 'my-bucket-name'

Usage:
  node ${fileName} my-bucket-name`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getStorageLayout,
};
