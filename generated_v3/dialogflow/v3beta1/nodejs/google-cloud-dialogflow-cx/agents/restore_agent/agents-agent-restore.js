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

// [START dialogflow_v3beta1_agents_restore_agent]
'use strict';

const {AgentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Restores an agent from a Google Cloud Storage URI.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} agentId - The server-generated ID of the agent to restore into (for example, '12345678-1234-1234-1234-1234567890ab').
 * @param {string} agentUri - The Google Cloud Storage URI to restore the agent from (for example, 'gs://example-bucket/agent.blob').
 */
async function restoreAgent(projectId, locationId, agentId, agentUri) {
  const client = new AgentsClient({
    apiEndpoint:
      locationId === 'global'
        ? 'dialogflow.googleapis.com'
        : `${locationId}-dialogflow.googleapis.com`,
  });

  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}`;

    const request = {
      name,
      agentUri,
    };

    // RestoreAgent initiates a long-running operation.
    const [operation] = await client.restoreAgent(request);
    await operation.promise();

    console.log(`Agent restored successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Agent not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { restoreAgent };
// [END dialogflow_v3beta1_agents_restore_agent]
