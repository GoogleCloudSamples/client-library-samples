// Copyright 2026 Google LLC
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

// [START cloudrun_v2_instances_instances_list_async]
const {InstancesClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new InstancesClient();

/**
 * Lists all instances within a given project and location.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} location The Google Cloud location (e.g., 'us-central1').
 */
async function listInstances(projectId, location) {
  const parent = `projects/${projectId}/locations/${location}`;

  try {
    // Arrange: Prepare the API request.
    const request = {
      parent,
    };

    // Act: Execute the API call and iterate through the results.
    console.log(`Listing instances in ${parent}...`);
    let instanceCount = 0;
    for await (const instance of client.listInstancesAsync(request)) {
      // Assert: Print the instance details.
      console.log(`- Instance found: ${instance.name}`);
      instanceCount++;
    }
    if (instanceCount === 0) {
      console.log('No instances found.');
    } else {
      console.log(`Successfully listed ${instanceCount} instances.`);
    }
  } catch (err) {
    // Handle common errors like NOT_FOUND.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The project '${projectId}' or location '${location}' was not found.`,
      );
      console.error(
        'Please ensure the project ID and location are correct and you have the necessary permissions.',
      );
    } else {
      console.error('Error listing instances:', err);
      // For other errors, you might want to log the full error for debugging.
      // console.error(err);
    }
  }
}
// [END cloudrun_v2_instances_instances_list_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(`2 arguments required but received ${args.length}.`);
  }
  await listInstances(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'

Usage:

 node instances-client-instances-list-async.js example-project-168 us-central1
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listInstances,
};
