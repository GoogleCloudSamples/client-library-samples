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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroup_create]
'use strict';

const {IdentityAwareProxyAdminServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyAdminServiceClient();

/**
 * Use the createTunnelDestGroup method
 *
 * @param {string} locationId - The Google Cloud location/region for the destination group (for example, 'us-central1').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} tunnelDestGroupId - The ID of the TunnelDestGroup to create. Must be 4-63 characters, containing only lowercase letters (a-z) and hyphens (-). Caller-chosen.
 */
async function createTunnelDestGroup(locationId, projectId, tunnelDestGroupId) {
  try {
    const parent = `projects/${projectId}/iap_tunnel/locations/${locationId}`;
    const tunnelDestGroup = {
      cidrs: ['10.0.0.1/32'],
      fqdns: ['internal.example.com'],
    };

    const request = {
      parent,
      tunnelDestGroupId,
      tunnelDestGroup,
    };

    const [response] = await client.createTunnelDestGroup(request);
    console.log(`Created tunnel destination group: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Tunnel destination group already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Operation failed: ${err.message}`);
    }
  }
}

module.exports = { createTunnelDestGroup };
// [END iap_v1_identityawareproxyadminservice_tunneldestgroup_create]
