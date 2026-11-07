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

// [START cloudcontrolspartner_v1beta_cloudcontrolspartnercore_ekmconnections_get]
'use strict';

const {CloudControlsPartnerCoreClient} = require('@google-cloud/cloudcontrolspartner');
const {status} = require('@grpc/grpc-js');

const client = new CloudControlsPartnerCoreClient();

/**
 * Retrieves EKM connections for a specified workload.
 *
 * @param {string} workloadId - The workload identifier.
 * @param {string} organizationId - The organization identifier.
 * @param {string} customerId - The customer identifier.
 * @param {string} locationId - The Google Cloud location.
 */
async function getEkmConnections(workloadId, organizationId, customerId, locationId) {
  try {
    const name = `organizations/${organizationId}/locations/${locationId}/customers/${customerId}/workloads/${workloadId}/ekmConnections`;
    const request = {
      name,
    };

    const [response] = await client.getEkmConnections(request);
    console.log(`Retrieved EKM connections: ${response.name}`);
    if (response.ekmConnections) {
      for (const connection of response.ekmConnections) {
        console.log(`Connection: ${connection.connectionName}, State: ${connection.connectionState}`);
      }
    }
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`EKM connections resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getEkmConnections };
// [END cloudcontrolspartner_v1beta_cloudcontrolspartnercore_ekmconnections_get]
