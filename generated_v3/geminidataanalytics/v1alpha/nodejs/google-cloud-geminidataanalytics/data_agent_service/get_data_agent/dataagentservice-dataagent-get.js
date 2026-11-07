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

// [START geminidataanalytics_v1alpha_dataagentservice_dataagent_get]
'use strict';

const {DataAgentServiceClient} = require('@google-cloud/geminidataanalytics');
const {status} = require('@grpc/grpc-js');

const client = new DataAgentServiceClient();

/**
 * Retrieves a DataAgent resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region for the DataAgent (for example, 'global').
 * @param {string} dataAgentId - The identifier of the DataAgent.
 */
async function getDataAgent(projectId, locationId, dataAgentId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataAgents/${dataAgentId}`;
    const request = {
      name,
    };

    const [dataAgent] = await client.getDataAgent(request);
    console.log(`Data agent name: ${dataAgent.name}`);
    return dataAgent;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`DataAgent not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing DataAgent: ${err.message}`);
    } else {
      console.error(`Failed to retrieve DataAgent: ${err.message}`);
    }
  }
}

module.exports = { getDataAgent };
// [END geminidataanalytics_v1alpha_dataagentservice_dataagent_get]
