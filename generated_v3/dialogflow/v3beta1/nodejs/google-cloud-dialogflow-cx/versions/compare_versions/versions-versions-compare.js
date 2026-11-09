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

// [START dialogflow_v3beta1_versions_compare_versions]
'use strict';

const {VersionsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Compares two versions of a flow.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} flowId - ID of the Flow (for example, 'example-flow-id')
 * @param {string} baseVersionId - The ID of the base flow version, or '0' for the draft flow.
 * @param {string} targetVersionId - The ID of the target flow version to compare against, or '0' for the draft flow.
 */
async function compareVersions(projectId, locationId, agentId, flowId, baseVersionId, targetVersionId) {
  try {
    const apiEndpoint =
      locationId === 'global'
        ? 'dialogflow.googleapis.com'
        : `${locationId}-dialogflow.googleapis.com`;
    const client = new VersionsClient({apiEndpoint});

    const targetVersion = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/versions/${targetVersionId}`;
    const baseVersion = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/versions/${baseVersionId}`;

    const request = {
      baseVersion,
      targetVersion,
    };

    const [response] = await client.compareVersions(request);

    console.log('Compared versions successfully.');
    console.log(`Base version content: ${response.baseVersionContentJson}`);
    console.log(`Target version content: ${response.targetVersionContentJson}`);
    if (response.compareTime) {
      console.log(`Compare time: ${JSON.stringify(response.compareTime)}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Specified flow or version not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { compareVersions };
// [END dialogflow_v3beta1_versions_compare_versions]
