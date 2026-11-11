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

// [START geminidataanalytics_v1beta_dataagentservice_accessibledataagents_list]
'use strict';

const {DataAgentServiceClient} = require('@google-cloud/geminidataanalytics');
const {status} = require('@grpc/grpc-js');

const client = new DataAgentServiceClient();

/**
 * Use the listAccessibleDataAgents method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location (for example, "global").
 */
async function listAccessibleDataAgents(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [dataAgents] = await client.listAccessibleDataAgents(request);

    console.log(`Accessible data agents found: ${dataAgents.length}`);
    for (const agent of dataAgents) {
      console.log(`Agent Name: ${agent.name}`);
      console.log(`Display Name: ${agent.displayName}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing resources in ${projectId}: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Specified project or location was not found: ${err.message}`);
    } else {
      console.error(`API call failed with status code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listAccessibleDataAgents };
// [END geminidataanalytics_v1beta_dataagentservice_accessibledataagents_list]
