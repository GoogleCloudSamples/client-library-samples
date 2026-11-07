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

// [START dialogflow_v3beta1_pages_page_get]
'use strict';

const {PagesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a page from a Dialogflow CX flow.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region or location of the Dialogflow CX agent (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} flowId - The server-generated ID of the flow (for example, '00000000-0000-0000-0000-000000000000').
 * @param {string} pageId - The server-generated ID of the page.
 */
async function getPage(projectId, locationId, agentId, flowId, pageId) {
  const apiEndpoint =
    locationId === 'global'
      ? 'dialogflow.googleapis.com'
      : `${locationId}-dialogflow.googleapis.com`;
  const client = new PagesClient({apiEndpoint});

  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/pages/${pageId}`;
    const request = {
      name,
    };

    const [page] = await client.getPage(request);

    console.log(`Page name: ${page.name}`);
    console.log(`Display name: ${page.displayName}`);
    return page;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Page not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
  }
}

module.exports = {getPage};
// [END dialogflow_v3beta1_pages_page_get]
