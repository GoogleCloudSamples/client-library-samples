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

// [START geminidataanalytics_v1alpha_dataagentservice_dataagentsync_update]
'use strict';

const {DataAgentServiceClient} = require('@google-cloud/geminidataanalytics');
const {status} = require('@grpc/grpc-js');

const client = new DataAgentServiceClient();

/**
 * Use the updateDataAgentSync method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location/region for the data agent (e.g., 'global' or 'us-central1').
 * @param {string} dataAgentId - The identifier of the existing data agent to update.
 */
async function updateDataAgentSync(projectId, locationId, dataAgentId) {
  try {
    const dataAgent = {
      name: `projects/${projectId}/locations/${locationId}/dataAgents/${dataAgentId}`,
      description: 'Updated Data Agent description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      dataAgent,
      updateMask,
    };

    const [response] = await client.updateDataAgentSync(request);
    console.log(`Updated Data Agent: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data agent not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateDataAgentSync };
// [END geminidataanalytics_v1alpha_dataagentservice_dataagentsync_update]
