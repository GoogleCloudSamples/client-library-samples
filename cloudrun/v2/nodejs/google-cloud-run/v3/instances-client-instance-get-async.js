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

// [START cloudrun_v2_instances_instance_get_async]
const {InstancesClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// Instantiate the client.
const client = new InstancesClient();

/**
 * Retrieves a Cloud Run instance by its full resource name.
 *
 * This sample demonstrates how to get details of a specific Cloud Run instance
 * using its project ID, location, and instance ID.
 */
async function getInstance(
  projectId = 'cloud-run-project-id', // Replace with your Google Cloud Project ID
  location = 'us-central1', // Replace with the region where the instance is located
  instanceId = 'my-instance-id', // Replace with the ID of the instance to retrieve
) {
  // Construct the full resource name for the instance.
  const name = `projects/${projectId}/locations/${location}/instances/${instanceId}`;

  const request = {
    name,
  };

  try {
    // Act: Make the API call to get the instance.
    const [instance] = await client.getInstance(request);

    // Assert: Print the retrieved instance details.
    console.log(`Successfully retrieved instance: ${instance.name}`);
    console.log(`  Description: ${instance.description || 'N/A'}`);
    console.log(`  UID: ${instance.uid}`);
  } catch (err) {
    // Handle the NOT_FOUND error specifically, as it's a common user-correctable issue.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Instance '${instanceId}' not found in location '${location}' of project '${projectId}'. ` +
          'Please ensure the instance ID and location are correct.',
      );
    } else {
      // For any other errors, log the details.
      console.error('Error retrieving instance:', err);
      // In a production application, you might want to log the full error stack
      // or use a more sophisticated error reporting mechanism.
    }
  }
}
// [END cloudrun_v2_instances_instance_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`3 arguments required but received ${args.length}.`);
  }
  await getInstance(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Instance ID like 'my-instance-id'

Usage:

 node instances-client-instance-get-async.js my-project-id us-central1 my-instance-id
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getInstance,
};
