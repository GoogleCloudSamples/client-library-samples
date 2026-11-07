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

// [START dialogflow_v3_versions_compare_versions]
'use strict';

const {VersionsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Compares two flow versions in Dialogflow CX.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} agentId - Server-generated unique identifier of the Dialogflow CX agent.
 * @param {string} flowId - Server-generated unique identifier of the Flow, or '00000000-0000-0000-0000-000000000000' for the default start flow.
 * @param {string} baseVersionId - Server-generated identifier of the base flow version (for example, '1'), or '0' for the draft flow version.
 * @param {string} targetVersionId - Server-generated identifier of the target flow version to compare against (for example, '2'), or '0' for the draft flow version.
 */
async function compareVersions(projectId, locationId, agentId, flowId, baseVersionId, targetVersionId) {
  try {
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
    }
    const client = new VersionsClient(clientOptions);

    const baseVersion = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/versions/${baseVersionId}`;
    const targetVersion = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/versions/${targetVersionId}`;

    const request = {
      baseVersion,
      targetVersion,
    };

    const [response] = await client.compareVersions(request);
    console.log('Version comparison result:');
    console.log(`Compare time: ${response.compareTime ? JSON.stringify(response.compareTime) : 'N/A'}`);
    console.log(`Base version content: ${response.baseVersionContentJson}`);
    console.log(`Target version content: ${response.targetVersionContentJson}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { compareVersions };
// [END dialogflow_v3_versions_compare_versions]
