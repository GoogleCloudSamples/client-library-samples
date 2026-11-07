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

// [START run_v2_revisions_revisions_list]
'use strict';

const {RevisionsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new RevisionsClient();

/**
 * Use the listRevisions method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} serviceId - ID of the Service (for example, 'example-service-id')
 */
async function listRevisions(projectId, locationId, serviceId) {
  try {
    // Construct the service resource path
    const parent = `projects/${projectId}/locations/${locationId}/services/${serviceId}`;

    // Request the revisions list
    const [revisions] = await client.listRevisions({parent});

    for (const revision of revisions) {
      console.log(`Revision: ${revision.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Specified service not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when accessing revisions.');
    } else {
      console.error(`Error listing revisions: ${err.message}`);
    }
  }
}

module.exports = { listRevisions };
// [END run_v2_revisions_revisions_list]
