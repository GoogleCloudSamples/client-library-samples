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

// [START dialogflow_v3_pages_page_delete]
'use strict';

const {PagesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a specified page in a Dialogflow CX flow.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Dialogflow CX agent is located (for example, 'global' or 'us-central1').
 * @param {string} agentId - The unique identifier of the Dialogflow CX agent.
 * @param {string} flowId - The unique identifier of the Dialogflow CX flow (for example, '00000000-0000-0000-0000-000000000000' for the default start flow).
 * @param {string} pageId - The unique identifier of the Dialogflow CX page to delete.
 */
async function deletePage(projectId, locationId, agentId, flowId, pageId) {
  const client = new PagesClient({
    apiEndpoint:
      locationId === 'global'
        ? 'dialogflow.googleapis.com'
        : `${locationId}-dialogflow.googleapis.com`,
  });

  const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/pages/${pageId}`;

  try {
    const request = {
      name,
      force: false,
    };

    await client.deletePage(request);
    console.log(`Deleted page: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Page not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed when deleting page: ${err.message}`);
    } else {
      console.error(`API error deleting page: ${err.message}`);
    }
  }
}

module.exports = {deletePage};
// [END dialogflow_v3_pages_page_delete]
