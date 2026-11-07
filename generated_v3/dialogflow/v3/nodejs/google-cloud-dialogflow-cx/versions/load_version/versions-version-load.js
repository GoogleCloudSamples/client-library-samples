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

// [START dialogflow_v3_versions_load_version]
'use strict';

const {VersionsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Loads a specified version into a draft flow.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} flowId - ID of the Flow (for example, 'example-flow-id')
 * @param {string} versionId - The server-generated ID of the Version to load into the draft flow (for example, '1').
 */
async function loadVersion(projectId, locationId, agentId, flowId, versionId) {
  try {
    const clientOptions = {};
    if (locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
    }
    const client = new VersionsClient(clientOptions);

    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/versions/${versionId}`;

    // Initiates the long-running operation to load the version into the draft flow
    const [operation] = await client.loadVersion({name});

    // Waits for the long-running operation to complete
    await operation.promise();

    console.log(`Version loaded into draft flow: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Version not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { loadVersion };
// [END dialogflow_v3_versions_load_version]
