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

// [START geminidataanalytics_v1beta_dataagentservice_dataagent_update]
'use strict';

const {DataAgentServiceClient} = require('@google-cloud/geminidataanalytics');
const {status} = require('@grpc/grpc-js');

const client = new DataAgentServiceClient();

/**
 * Use the updateDataAgent method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 * @param {string} dataAgentId - The resource ID of the existing DataAgent to update, conforming to ^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$. Sourced from an existing DataAgent resource.
 */
async function updateDataAgent(projectId, locationId, dataAgentId) {
  try {
    const dataAgent = {
      name: `projects/${projectId}/locations/${locationId}/dataAgents/${dataAgentId}`,
      description: 'Updated description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      dataAgent,
      updateMask,
    };

    // UpdateDataAgent initiates a long-running operation.
    const [operation] = await client.updateDataAgent(request);
    const [response] = await operation.promise();

    console.log(`Updated DataAgent: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Google API error code ${err.code}: ${err.details || err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateDataAgent };
// [END geminidataanalytics_v1beta_dataagentservice_dataagent_update]
