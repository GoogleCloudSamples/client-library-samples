// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START run_v2_revisions_revision_get]
'use strict';

const {RevisionsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new RevisionsClient();

/**
 * Retrieves details of a specific Cloud Run revision.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} serviceId - The caller-chosen ID of the Cloud Run service (for example, 'example-service').
 * @param {string} revisionId - The server-generated ID of the revision (for example, 'example-service-00001-abc').
 */
async function getRevision(projectId, locationId, serviceId, revisionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/services/${serviceId}/revisions/${revisionId}`;

    const [revision] = await client.getRevision({name});

    console.log(`Revision name: ${revision.name}`);
    console.log(`Container image: ${revision.containers?.[0]?.image}`);
    return revision;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Revision was not found for service ${serviceId}: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing revision: ${err.message}`);
    } else {
      console.error(`Failed to retrieve revision: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getRevision };
// [END run_v2_revisions_revision_get]
