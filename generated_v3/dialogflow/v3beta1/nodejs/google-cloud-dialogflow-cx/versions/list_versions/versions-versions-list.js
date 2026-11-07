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

// [START dialogflow_v3beta1_versions_versions_list]
'use strict';

const {VersionsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists versions for a Dialogflow CX flow.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} flowId - The server-generated ID of the flow, or '00000000-0000-0000-0000-000000000000' for the Default Start Flow.
 */
async function listVersions(projectId, locationId, agentId, flowId) {
  // Construct the regional API endpoint for the client
  const apiEndpoint =
    locationId === 'global'
      ? 'dialogflow.googleapis.com'
      : `${locationId}-dialogflow.googleapis.com`;

  const client = new VersionsClient({apiEndpoint});

  try {
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}`;

    const request = {
      parent,
    };

    const [versions] = await client.listVersions(request);

    console.log(`Retrieved ${versions.length} version(s) for flow: ${flowId}`);
    for (const version of versions) {
      console.log(`- Version Name: ${version.name}`);
      console.log(`  Display Name: ${version.displayName}`);
      console.log(`  State: ${version.state}`);
    }

    return versions;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listVersions };
// [END dialogflow_v3beta1_versions_versions_list]
