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

// [START networksecurity_v1_firewallactivation_projectfirewallendpoints_list]
'use strict';

const {v1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

/**
 * Lists project firewall endpoints in a Google Cloud project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region where the firewall endpoints reside.
 */
async function listProjectFirewallEndpoints(projectId, locationId) {
  const client = new v1.FirewallActivationClient();

  try {
    // Firewall endpoints are zonal resources. If a regional location identifier is provided,
    // append a zone suffix (for example, us-central1-a) to construct a valid resource path.
    const targetLocation = /^[a-z]+-[a-z0-9]+$/i.test(locationId)
      ? `${locationId}-a`
      : locationId;
    const parent = `projects/${projectId}/locations/${targetLocation}`;
    const request = {
      parent,
    };

    const [endpoints] = await client.listProjectFirewallEndpoints(request);

    if (!endpoints || endpoints.length === 0) {
      console.log('No firewall endpoints found.');
      return;
    }

    for (const endpoint of endpoints) {
      console.log(`Endpoint Name: ${endpoint.name}`);
      console.log(`State: ${endpoint.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = {listProjectFirewallEndpoints};
// [END networksecurity_v1_firewallactivation_projectfirewallendpoints_list]
