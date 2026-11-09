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

// [START dialogflow_v3_changelogs_changelog_get]
'use strict';

const {ChangelogsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new ChangelogsClient();

/**
 * Retrieves a specific changelog for a Dialogflow CX agent.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the agent is located (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent (for example, '12345678-1234-1234-1234-123456789abc').
 * @param {string} changelogId - The server-generated ID of the changelog to retrieve (for example, '12345678-1234-1234-1234-123456789abc').
 */
async function getChangelog(projectId, locationId, agentId, changelogId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/changelogs/${changelogId}`;

    const changelogClient =
      locationId && locationId !== 'global'
        ? new ChangelogsClient({
            apiEndpoint: `${locationId}-dialogflow.googleapis.com`,
          })
        : client;

    const [changelog] = await changelogClient.getChangelog({name});

    console.log(`Changelog Name: ${changelog.name}`);
    console.log(`User Email: ${changelog.userEmail}`);
    console.log(`Resource Type: ${changelog.resourceType}`);
    console.log(`Action: ${changelog.action}`);

    return changelog;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Changelog not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { getChangelog };
// [END dialogflow_v3_changelogs_changelog_get]
