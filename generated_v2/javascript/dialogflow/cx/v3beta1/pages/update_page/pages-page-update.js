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

// [START dialogflow_v3beta1_pages_page_update]
'use strict';

const {PagesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new PagesClient();

/**
 * Updates the display name of a Dialogflow CX page.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID (for example, 'global' or 'us-central1').
 * @param {string} agentId - The ID of the Dialogflow CX agent.
 * @param {string} flowId - The ID of the Dialogflow CX flow containing the page.
 * @param {string} pageId - The ID of the Dialogflow CX page to update.
 */
async function updatePage(projectId, locationId, agentId, flowId, pageId) {
  try {
    const page = {
      name: `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/pages/${pageId}`,
      displayName: 'example-updated-display-name',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      page,
      updateMask,
    };

    const [response] = await client.updatePage(request);
    console.log(`Updated page name: ${response.name}`);
    console.log(`Updated display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Page not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updatePage };
// [END dialogflow_v3beta1_pages_page_update]
