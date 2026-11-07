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

// [START geminidataanalytics_v1_dataagentservice_dataagent_get]
'use strict';

const {DataAgentServiceClient} = require('@google-cloud/geminidataanalytics');
const {status} = require('@grpc/grpc-js');

const client = new DataAgentServiceClient();

/**
 * Use the getDataAgent method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the DataAgent (for example, 'global').
 * @param {string} dataAgentId - The identifier of the DataAgent to retrieve.
 */
async function getDataAgent(projectId, locationId, dataAgentId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataAgents/${dataAgentId}`;
    const request = {
      name,
    };

    const [response] = await client.getDataAgent(request);
    console.log(`Retrieved DataAgent: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`DataAgent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for DataAgent: ${err.message}`);
    } else {
      console.error(`Error retrieving DataAgent: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getDataAgent };
// [END geminidataanalytics_v1_dataagentservice_dataagent_get]
