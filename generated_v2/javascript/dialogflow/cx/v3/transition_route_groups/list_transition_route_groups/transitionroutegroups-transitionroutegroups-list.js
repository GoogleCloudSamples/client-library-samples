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

// [START dialogflow_v3_transitionroutegroups_transitionroutegroups_list]
'use strict';

const {TransitionRouteGroupsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Lists transition route groups in a specified flow.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent (for example, '12345678-abcd-ef01-2345-6789abcdef01').
 * @param {string} flowId - The server-generated ID of the flow (for example, '00000000-0000-0000-0000-000000000000' for the default start flow).
 */
async function listTransitionRouteGroups(projectId, locationId, agentId, flowId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new TransitionRouteGroupsClient(clientOptions);

  try {
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}`;

    const request = {
      parent,
    };

    const [transitionRouteGroups] =
      await client.listTransitionRouteGroups(request);

    for (const group of transitionRouteGroups) {
      console.log(`Transition Route Group Name: ${group.name}`);
      console.log(`Display Name: ${group.displayName}`);
    }

    return transitionRouteGroups;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error listing transition route groups: ${err.message}`);
    }
  }
}

module.exports = { listTransitionRouteGroups };
// [END dialogflow_v3_transitionroutegroups_transitionroutegroups_list]
