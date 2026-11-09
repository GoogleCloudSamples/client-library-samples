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

// [START dialogflow_v3beta1_pages_page_delete]
'use strict';

const {PagesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a specified page in a Dialogflow CX flow.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the agent resides (for example, 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} flowId - The server-generated ID of the Dialogflow CX flow.
 * @param {string} pageId - The server-generated ID of the page to delete.
 */
async function deletePage(projectId, locationId, agentId, flowId, pageId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new PagesClient(clientOptions);

  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/pages/${pageId}`;
    const request = {
      name,
    };

    await client.deletePage(request);
    console.log(`Deleted page: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Page not found: ${err.message}`);
    } else {
      console.error(`Failed to delete page: ${err.message}`);
    }
  }
}

module.exports = {deletePage};
// [END dialogflow_v3beta1_pages_page_delete]
