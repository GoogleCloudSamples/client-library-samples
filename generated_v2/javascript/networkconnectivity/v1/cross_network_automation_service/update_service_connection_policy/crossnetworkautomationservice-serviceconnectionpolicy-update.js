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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_update]
'use strict';

const {CrossNetworkAutomationServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new CrossNetworkAutomationServiceClient();

/**
 * Use the updateServiceConnectionPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID where the Service Connection Policy resides.
 * @param {string} locationId - The Google Cloud region where the Service Connection Policy is located.
 * @param {string} serviceConnectionPolicyId - The ID of the existing Service Connection Policy to update.
 */
async function updateServiceConnectionPolicy(projectId, locationId, serviceConnectionPolicyId) {
  try {
    const serviceConnectionPolicy = {
      name: `projects/${projectId}/locations/${locationId}/serviceConnectionPolicies/${serviceConnectionPolicyId}`,
      description: 'Updated service connection policy description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateServiceConnectionPolicy({
      serviceConnectionPolicy,
      updateMask,
    });

    const [response] = await operation.promise();

    console.log(`Service connection policy updated: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service connection policy not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update service connection policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateServiceConnectionPolicy };
// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_update]
