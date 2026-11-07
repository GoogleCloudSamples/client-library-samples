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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroups_list]
'use strict';

const {IdentityAwareProxyAdminServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyAdminServiceClient();

/**
 * Lists tunnel destination groups in the specified location.
 *
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 */
async function listTunnelDestGroups(locationId) {
  try {
    const projectId = await client.getProjectId();
    const parent = `projects/${projectId}/iap_tunnel/locations/${locationId}`;
    const request = {
      parent,
    };

    const [tunnelDestGroups] = await client.listTunnelDestGroups(request);
    for (const group of tunnelDestGroups) {
      console.log(`Tunnel Destination Group: ${group.name}`);
      if (group.cidrs && group.cidrs.length > 0) {
        console.log(`  CIDRs: ${group.cidrs.join(', ')}`);
      }
      if (group.fqdns && group.fqdns.length > 0) {
        console.log(`  FQDNs: ${group.fqdns.join(', ')}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}):`, err.message);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = { listTunnelDestGroups };
// [END iap_v1_identityawareproxyadminservice_tunneldestgroups_list]
