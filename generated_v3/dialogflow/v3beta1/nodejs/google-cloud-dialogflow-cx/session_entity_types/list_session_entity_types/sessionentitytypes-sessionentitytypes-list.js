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

// [START dialogflow_v3beta1_sessionentitytypes_sessionentitytypes_list]
'use strict';

const {SessionEntityTypesClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists session entity types in a Dialogflow CX session.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the agent is located (for example, 'global' or 'us-central1').
 * @param {string} agentId - The server-generated unique identifier of the Dialogflow CX agent (for example, '12345678-abcd-1234-abcd-1234567890ab').
 * @param {string} sessionId - The caller-chosen unique identifier for the user session (for example, 'session-123').
 */
async function listSessionEntityTypes(projectId, locationId, agentId, sessionId) {
  try {
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
    }
    const client = new SessionEntityTypesClient(clientOptions);

    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}/sessions/${sessionId}`;

    const request = {
      parent,
    };

    const [sessionEntityTypes] = await client.listSessionEntityTypes(request);

    console.log(`Retrieved ${sessionEntityTypes.length} session entity type(s).`);
    for (const sessionEntityType of sessionEntityTypes) {
      console.log(`- Name: ${sessionEntityType.name}`);
      console.log(`  Override mode: ${sessionEntityType.entityOverrideMode}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Session not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listSessionEntityTypes };
// [END dialogflow_v3beta1_sessionentitytypes_sessionentitytypes_list]
