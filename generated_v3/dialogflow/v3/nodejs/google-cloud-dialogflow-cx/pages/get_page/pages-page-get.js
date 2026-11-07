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

// [START dialogflow_v3_pages_page_get]
'use strict';

const {PagesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a specific page from a Dialogflow CX flow.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Dialogflow CX agent (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the Dialogflow CX agent is hosted (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent (for example, '11111111-2222-3333-4444-555555555555').
 * @param {string} flowId - The ID of the Dialogflow CX flow containing the page (for example, '00000000-0000-0000-0000-000000000000' for default start flow).
 * @param {string} pageId - The server-generated ID of the Dialogflow CX page to retrieve (for example, 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee').
 */
async function getPage(projectId, locationId, agentId, flowId, pageId) {
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

    const [page] = await client.getPage(request);

    console.log(`Page Display Name: ${page.displayName}`);
    console.log(`Page Resource Name: ${page.name}`);
    return page;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Page resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing page: ${err.message}`);
    } else {
      console.error(`Failed to retrieve page: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPage };
// [END dialogflow_v3_pages_page_get]
