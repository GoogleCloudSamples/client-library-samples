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

// [START cloudrun_v2_executions_execution_delete_async]
const {ExecutionsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js'); // Import status for error handling

// Instantiates a client.
const client = new ExecutionsClient();

/**
 * Deletes a Cloud Run execution.
 *
 * This sample demonstrates how to delete a specific execution of a Cloud Run job.
 * Deleting an execution will stop any running tasks associated with it and
 * remove the execution resource. This operation is asynchronous and returns
 * a long-running operation (LRO) which must be awaited for completion.
 *
 * @param {string} projectId Your Google Cloud Project ID.
 * @param {string} locationId The region of the execution (e.g., 'us-central1').
 * @param {string} jobId The ID of the job that owns the execution.
 * @param {string} executionId The ID of the execution to delete.
 */
async function deleteExecutionSample(
  projectId = 'your-project-id', // Replace with your project ID
  locationId = 'us-central1', // Replace with your desired location
  jobId = 'my-job-id', // Replace with the ID of your job
  executionId = 'my-execution-id', // Replace with the ID of the execution to delete
) {
  // Construct the full resource name for the execution.
  const name = client.executionPath(projectId, locationId, jobId, executionId);

  const request = {
    name,
    // Set to true to validate the request without actually performing the deletion.
    // In a production application, you might want to set this to true first to
    // check permissions and resource existence before attempting the actual deletion.
    validateOnly: false,
    // Optional: Provide the Etag to prevent concurrent modifications.
    // If the Etag does not match the server's current Etag for the resource,
    // the request will fail with a PRECONDITION_FAILED error.
    // etag: 'some-etag-value',
  };

  try {
    // Deletes the specified execution. This is a long-running operation (LRO).
    // The `deleteExecution` method returns an LRO object that can be used to
    // track the progress and result of the asynchronous deletion.
    console.log(`Attempting to delete execution: ${name}`);
    const [operation] = await client.deleteExecution(request);
    console.log(
      `Deletion operation for execution ${name} initiated. Operation name: ${operation.name}`,
    );

    // Wait for the long-running operation to complete.
    // The `operation.promise()` method returns a promise that resolves with the
    // final state of the deleted resource once the operation is finished.
    const [response] = await operation.promise();
    console.log(`Execution ${response.name} deleted successfully.`);
    console.log(`  UID: ${response.uid}`);
    console.log(`  Job: ${response.job}`);
  } catch (err) {
    // The `google-gax` library wraps gRPC errors. The `code` property of the error
    // object corresponds to gRPC status codes (e.g., 5 for NOT_FOUND, 7 for PERMISSION_DENIED).
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Execution '${name}' not found. ` +
          'Please ensure the project ID, location ID, job ID, and execution ID are correct ' +
          'and that the execution exists in your project.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied when deleting execution '${name}'. ` +
          'Please ensure the authenticated service account or user has the necessary ' +
          "permissions (e.g., 'roles/run.admin' or 'roles/run.developer' with delete privileges) " +
          'for the Cloud Run execution.',
      );
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(
        `Error: Precondition failed for execution '${name}'. ` +
          'This usually means the Etag provided in the request did not match the current ' +
          'Etag of the resource, indicating a concurrent modification. ' +
          'Please retry the operation, possibly fetching the latest Etag first.',
      );
    } else {
      // Log any other unexpected errors during the API call.
      console.error(
        `An unexpected error occurred while deleting execution '${name}':`,
        err.message,
      );
    }
  }
}
// [END cloudrun_v2_executions_execution_delete_async]

module.exports = {
  deleteExecutionSample,
};
