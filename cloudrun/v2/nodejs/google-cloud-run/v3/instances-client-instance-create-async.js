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

// [START cloudrun_v2_instances_instance_create_async]
const {InstancesClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// Instantiate the client. This is a global client to avoid multiple connections.
const client = new InstancesClient();

/**
 * Creates a new Cloud Run instance.
 *
 * This function demonstrates how to create a new Cloud Run instance with a specified
 * container image and service account. The operation is asynchronous and returns
 * a long-running operation that can be polled for completion.
 *
 * @param {string} projectId Your Google Cloud Project ID.
 *   (e.g., 'my-project-123')
 * @param {string} location The Google Cloud region where the instance will be created.
 *   (e.g., 'us-central1')
 * @param {string} instanceId A unique identifier for the instance. It must begin with a
 *   letter, cannot end with a hyphen, and must contain fewer than 50 characters.
 *   (e.g., 'my-new-instance')
 * @example <caption>Call the createInstance function with example values:</caption>
 * createInstance('my-project-id', 'us-central1', 'my-instance-id');
 */
async function createInstance(
  projectId = 'my-project-id',
  location = 'us-central1',
  instanceId = 'my-instance-id',
) {
  // Construct the parent resource name for the request.
  const parent = `projects/${projectId}/locations/${location}`;

  // Define the instance configuration.
  // A minimal instance requires at least one container definition.
  const instancePayload = {
    // The container image to deploy. Using a public image for demonstration.
    // Replace with your desired image if needed.
    containers: [
      {
        image: 'us-docker.pkg.dev/cloudrun/container/hello',
      },
    ],
    // Optional: Set a description for the instance.
    description:
      'My new sample Cloud Run instance created via Node.js client library',
  };

  // Prepare the request object for creating the instance.
  const request = {
    parent,
    instanceId,
    instance: instancePayload,
    // Optional. Set to true to validate the request without actually creating the resource.
    // For this sample, we want to create the resource, so it's set to false.
    validateOnly: false,
  };

  try {
    // Act: Execute the API call to create the instance.
    // This returns a long-running operation (LRO) because instance creation can take time.
    const [operation] = await client.createInstance(request);
    console.log(
      `Creating instance '${instanceId}'... Operation: ${operation.name}`,
    );

    // Wait for the LRO to complete and get the final instance resource.
    const [response] = await operation.promise();

    // Assert: Print the successful outcome, including relevant API response properties.
    console.log(`Instance '${response.name}' created successfully.`);
    console.log(`  Description: ${response.description}`);
    console.log(`  Container Image: ${response.containers[0].image}`);
    console.log(`  Service Account: ${response.serviceAccount}`);
    console.log(`  Instance UID: ${response.uid}`);
  } catch (err) {
    // Handle common API errors.
    // The `status` object from `@grpc/grpc-js` provides gRPC status codes.
    if (err.code === status.ALREADY_EXISTS) {
      console.error(
        `Error: Instance '${instanceId}' already exists in location '${location}' of project '${projectId}'.`,
      );
      console.error(
        'To proceed, either choose a different `instanceId` or manage the existing instance.',
      );
    } else {
      // For any other unexpected errors, log the full error object.
      console.error(`Error creating instance '${instanceId}':`, err);
      console.error(
        'Please check the error details and ensure the project, location, and permissions are correct.',
      );
    }
  }
}
// [END cloudrun_v2_instances_instance_create_async]

// Export the function for use in other modules or for testing.
module.exports = {
  createInstance,
};

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`3 arguments required but received ${args.length}.`);
  }
  await createInstance(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Instance ID like 'my-new-instance'

Usage:

 node instances-client-instance-create-async.js my-project-id us-central1 my-new-instance
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}
