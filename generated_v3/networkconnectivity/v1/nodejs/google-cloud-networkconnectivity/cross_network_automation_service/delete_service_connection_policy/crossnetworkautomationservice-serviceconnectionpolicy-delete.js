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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_delete]
'use strict';

const {CrossNetworkAutomationServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new CrossNetworkAutomationServiceClient();

/**
 * Use the deleteServiceConnectionPolicy method
 *
 * @param {string} projectId - The ID of the Google Cloud project containing the service connection policy.
 * @param {string} locationId - The Google Cloud location or region for the service connection policy (for example, 'us-central1' or 'global').
 * @param {string} serviceConnectionPolicyId - The identifier of the service connection policy to delete. Read this ID from an existing ServiceConnectionPolicy resource.
 */
async function deleteServiceConnectionPolicy(projectId, locationId, serviceConnectionPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/serviceConnectionPolicies/${serviceConnectionPolicyId}`;

    const [operation] = await client.deleteServiceConnectionPolicy({name});
    const [response] = await operation.promise();

    console.log(`Deleted service connection policy: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service connection policy not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation failed precondition: ${err.message}`);
    } else {
      console.error(`API error during deletion: ${err.message}`);
    }
  }
}

module.exports = { deleteServiceConnectionPolicy };
// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_delete]
