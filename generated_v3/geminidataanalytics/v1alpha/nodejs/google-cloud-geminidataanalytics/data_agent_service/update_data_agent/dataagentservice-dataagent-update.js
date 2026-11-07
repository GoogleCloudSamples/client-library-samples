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

// [START geminidataanalytics_v1alpha_dataagentservice_dataagent_update]
'use strict';

const {DataAgentServiceClient} = require('@google-cloud/geminidataanalytics');
const {status} = require('@grpc/grpc-js');

const client = new DataAgentServiceClient();

/**
 * Use the updateDataAgent method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the DataAgent (e.g., 'global').
 * @param {string} dataAgentId - The resource ID of the existing DataAgent to update. Sourced from the caller-assigned ID or server-generated ID from an existing DataAgent.
 */
async function updateDataAgent(projectId, locationId, dataAgentId) {
  try {
    const dataAgent = {
      name: `projects/${projectId}/locations/${locationId}/dataAgents/${dataAgentId}`,
      description: 'Updated description for Data Agent',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateDataAgent({
      dataAgent,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated Data Agent: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data Agent not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (status ${err.code}): ${err.message}`);
    } else {
      console.error(`Operation failed: ${err.message}`);
    }
  }
}

module.exports = { updateDataAgent };
// [END geminidataanalytics_v1alpha_dataagentservice_dataagent_update]
