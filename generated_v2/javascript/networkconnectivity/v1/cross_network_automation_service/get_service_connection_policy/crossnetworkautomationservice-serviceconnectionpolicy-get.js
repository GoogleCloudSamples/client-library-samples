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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_get]
'use strict';

const {CrossNetworkAutomationServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new CrossNetworkAutomationServiceClient();

/**
 * Use the getServiceConnectionPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the service connection policy.
 * @param {string} serviceConnectionPolicyId - The identifier of the ServiceConnectionPolicy to retrieve.
 */
async function getServiceConnectionPolicy(projectId, locationId, serviceConnectionPolicyId) {
  try {
    const name = client.serviceConnectionPolicyPath(
      projectId,
      locationId,
      serviceConnectionPolicyId
    );

    const request = {
      name,
    };

    const [policy] = await client.getServiceConnectionPolicy(request);
    console.log(`Service connection policy: ${policy.name}`);
    console.log(`Network: ${policy.network}`);
    console.log(`Service class: ${policy.serviceClass}`);
    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Service connection policy not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied accessing service connection policy.');
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getServiceConnectionPolicy };
// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_get]
