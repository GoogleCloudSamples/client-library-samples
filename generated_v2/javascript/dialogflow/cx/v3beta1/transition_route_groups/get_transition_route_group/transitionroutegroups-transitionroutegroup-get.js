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

// [START dialogflow_v3beta1_transitionroutegroups_transitionroutegroup_get]
'use strict';

const {TransitionRouteGroupsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a specified transition route group.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - Google Cloud region where the agent is hosted (for example, 'us-central1')
 * @param {string} agentId - ID of the agent (for example, 'example-agent-id')
 * @param {string} flowId - ID of the flow (for example, 'example-flow-id')
 * @param {string} transitionRouteGroupId - ID of the transition route group (for example, 'example-transitionroutegroup-id')
 */
async function getTransitionRouteGroup(projectId, locationId, agentId, flowId, transitionRouteGroupId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }
  const client = new TransitionRouteGroupsClient(clientOptions);

  const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/flows/${flowId}/transitionRouteGroups/${transitionRouteGroupId}`;

  const request = {
    name,
  };

  try {
    const [response] = await client.getTransitionRouteGroup(request);

    console.log(`Transition route group name: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Transition route group not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error retrieving transition route group: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { getTransitionRouteGroup };
// [END dialogflow_v3beta1_transitionroutegroups_transitionroutegroup_get]
