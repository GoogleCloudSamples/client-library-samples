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

// [START cloudrun_v2_revisions_revision_delete_async]
'use strict';

const {RevisionsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js'); // For specific error handling

// Instantiate the client. This is a global client to be reused across calls.
const client = new RevisionsClient();

/**
 * Deletes a specific Cloud Run revision.
 *
 * This sample demonstrates how to delete a revision using the Cloud Run Admin API.
 * Deleting a revision is a long-running operation, and the method will return
 * an operation object that you can await to confirm the deletion.
 *
 * @param {string} projectId The Google Cloud Project ID.
 *     (e.g., 'my-project-id')
 * @param {string} location The Google Cloud region where the revision is located.
 *     (e.g., 'us-central1')
 * @param {string} serviceId The ID of the service that owns the revision.
 *     (e.g., 'my-service')
 * @param {string} revisionId The ID of the revision to delete.
 *     (e.g., 'my-service-00001')
 */
async function deleteRevision(
  projectId = 'my-project-id', // Replace with your Google Cloud Project ID
  location = 'us-central1', // Replace with your desired region
  serviceId = 'my-service', // Replace with the ID of your service
  revisionId = 'my-service-00001', // Replace with the ID of the revision to delete
) {
  // Arrange: Construct the full resource name for the revision.
  const name = client.revisionPath(projectId, location, serviceId, revisionId);

  const request = {
    name,
    // Optional: Set validateOnly to true to test the request without actually performing the deletion.
    // validateOnly: true,
    // Optional: Provide an etag to ensure the revision has not been modified since it was last fetched.
    // etag: 'some-etag-value',
  };

  try {
    // Act: Execute the API call to delete the revision.
    // The deleteRevision method returns a long-running operation.
    // We await the promise returned by operation.promise() to ensure the
    // deletion is complete before proceeding.
    const [operation] = await client.deleteRevision(request);
    const [revision] = await operation.promise(); // Wait for the operation to complete.

    // Assert: Log the successful outcome.
    console.log(`Revision '${revision.name}' deleted successfully.`);
  } catch (err) {
    // Handle specific API errors.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Revision '${name}' not found. It may have already been deleted or never existed. ` +
          'Please check the project ID, location, service ID, and revision ID.',
      );
    } else {
      // Log other unexpected errors.
      console.error(`Error deleting revision '${name}':`, err);
      // In a production application, you might want more sophisticated error logging
      // or re-throwing specific errors after wrapping them with custom error types.
    }
  }
}
// [END cloudrun_v2_revisions_revision_delete_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`4 arguments required but received ${args.length}.`);
  }
  await deleteRevision(args[0], args[1], args[2], args[3]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Service ID like 'my-service'
 - Revision ID like 'my-service-00001'

Usage:

 node revisions-client-revision-delete-async.js my-project-id us-central1 my-service my-service-00001
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  deleteRevision,
};
