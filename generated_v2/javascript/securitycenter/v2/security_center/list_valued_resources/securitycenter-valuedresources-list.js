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

// [START securitycenter_v2_securitycenter_valuedresources_list]
'use strict';

const {SecurityCenterClient} = require('@google-cloud/security-center');
const {status} = require('@grpc/grpc-js');

const client = new SecurityCenterClient();

/**
 * Use the listValuedResources method
 *
 * @param {string} organizationId - The Google Cloud organization ID. For example, '1234567890'.
 * @param {string} simulationId - The simulation identifier or 'latest' to query the most recent simulation run.
 */
async function listValuedResources(organizationId, simulationId) {
  try {
    const parent = `organizations/${organizationId}/simulations/${simulationId}`;

    const [valuedResources] = await client.listValuedResources({parent});

    for (const resource of valuedResources) {
      console.log(`Resource: ${resource.name}`);
      console.log(`Display Name: ${resource.displayName}`);
      console.log(`Resource Value: ${resource.resourceValue}`);
      console.log(`Exposed Score: ${resource.exposedScore}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Requested simulation or organization not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing Security Command Center: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error encountered (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listValuedResources };
// [END securitycenter_v2_securitycenter_valuedresources_list]
