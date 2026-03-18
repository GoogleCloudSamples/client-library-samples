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

// [START cloudrun_v2_revisions_revisions_list_async]
const {RevisionsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// Instantiates a client.
// It's recommended to instantiate clients outside of the functions
// to avoid repeated instantiation, which incurs connection overhead.
const client = new RevisionsClient();

/**
 * Lists all revisions in a given Google Cloud project and location.
 *
 * This sample demonstrates how to list all revisions across all services in a
 * specified location. It uses asynchronous iteration to handle pagination
 * automatically.
 *
 * @param {string} [projectId='my-project-id'] The Google Cloud project ID.
 * @param {string} [location='us-central1'] The Google Cloud location (e.g., 'us-central1').
 */
async function listRevisions(
  projectId = 'my-project-id',
  location = 'us-central1',
) {
  // Construct the parent path to list revisions across all services in the specified location.
  // To list revisions for a specific service, replace '-' with the service name.
  // Example: `projects/${projectId}/locations/${location}/services/my-service`
  const parent = `projects/${projectId}/locations/${location}/services/-`;

  const request = {
    parent,
  };

  try {
    console.log(
      `Listing revisions in project ${projectId}, location ${location}...`,
    );

    // The client library will automatically handle pagination.
    // Use listRevisionsAsync() for async iteration to process results page by page.
    // Each 'revision' object will be a protos.google.cloud.run.v2.Revision.
    for await (const revision of client.listRevisionsAsync(request)) {
      console.log(`Revision Name: ${revision.name}`);
      console.log(`  Service: ${revision.service}`);
      // Find the 'Ready' condition to check the serving status.
      const readyCondition = revision.conditions?.find(c => c.type === 'Ready');
      console.log(
        `  Serving Status: ${readyCondition ? readyCondition.state : 'Unknown'}`,
      );
      console.log(`  Log URI: ${revision.logUri}`);
      console.log('---');
    }
    console.log('Successfully listed all revisions.');
  } catch (err) {
    // Check for specific error types and provide user-friendly messages.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The project '${projectId}' or location '${location}' might not exist, ` +
          'or there are no services/revisions in this location. ' +
          'Please check the project ID and location, and ensure Cloud Run services are deployed.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        'Error: Permission denied when listing revisions. ' +
          "Ensure the service account running this code has 'roles/run.viewer' or equivalent permissions " +
          `on project '${projectId}' and its resources.`,
      );
    } else {
      // For any other errors, log the generic error message.
      console.error(`Error listing revisions: ${err.message}`);
    }
  }
}
// [END cloudrun_v2_revisions_revisions_list_async]

module.exports = {listRevisions};
