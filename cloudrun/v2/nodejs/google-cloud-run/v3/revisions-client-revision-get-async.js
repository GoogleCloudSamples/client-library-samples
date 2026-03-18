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

// [START cloudrun_v2_revisions_revision_get_async]
const {RevisionsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// Instantiates a client
const client = new RevisionsClient();

/**
 * Gets information about a specific Cloud Run revision.
 *
 * This sample demonstrates how to retrieve details for a particular revision
 * within a Cloud Run service. Revisions are immutable snapshots of your
 * service's code and configuration, created automatically when a service is updated.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-id')
 * @param {string} location The Google Cloud region where the service is located (e.g., 'us-central1')
 * @param {string} serviceId The ID of the Cloud Run service (e.g., 'my-service')
 * @param {string} revisionId The ID of the revision to retrieve (e.g., 'my-service-00001-abc')
 */
async function getRevision(
  projectId = 'your-project-id',
  location = 'us-central1',
  serviceId = 'my-service',
  revisionId = 'my-service-00001-abc',
) {
  const name = `projects/${projectId}/locations/${location}/services/${serviceId}/revisions/${revisionId}`;

  const request = {
    name,
  };

  try {
    // Get the revision details
    const [revision] = await client.getRevision(request);

    console.log(`Successfully retrieved revision: ${revision.name}`);
    console.log(`  Service: ${revision.service}`);
    console.log(
      `  Container Image: ${revision.containers?.[0]?.image || 'N/A'}`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Revision ${revisionId} not found in service ${serviceId} in location ${location} of project ${projectId}.`,
      );
      console.error(
        'Please ensure the project ID, location, service ID, and revision ID are correct.',
      );
    } else {
      // Handle other potential errors during the API call
      console.error('Error getting revision:', err);
    }
  }
}

// [END cloudrun_v2_revisions_revision_get_async]

module.exports = {
  getRevision,
};
