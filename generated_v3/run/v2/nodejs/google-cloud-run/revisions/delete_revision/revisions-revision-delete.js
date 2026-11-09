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

// [START run_v2_revisions_revision_delete]
'use strict';

const {RevisionsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new RevisionsClient();

/**
 * Use the deleteRevision method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} serviceId - ID of the Service (for example, 'example-service-id')
 * @param {string} revisionId - ID of the Revision (for example, 'example-revision-id')
 */
async function deleteRevision(projectId, locationId, serviceId, revisionId) {
  try {
    const name = client.revisionPath(projectId, locationId, serviceId, revisionId);

    // Initiates the deletion long-running operation and waits for completion.
    const [operation] = await client.deleteRevision({name});
    const [response] = await operation.promise();

    console.log(`Deleted revision: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Revision not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cannot delete revision: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { deleteRevision };
// [END run_v2_revisions_revision_delete]
