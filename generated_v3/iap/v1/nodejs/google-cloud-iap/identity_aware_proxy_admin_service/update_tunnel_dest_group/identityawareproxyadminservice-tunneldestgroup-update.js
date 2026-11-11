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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroup_update]
'use strict';

const {IdentityAwareProxyAdminServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyAdminServiceClient();

/**
 * Use the updateTunnelDestGroup method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the tunnel destination group.
 * @param {string} destGroupId - The caller-chosen identifier of the tunnel destination group (4-63 characters, matching '[a-z]-').
 */
async function updateTunnelDestGroup(projectId, locationId, destGroupId) {
  try {
    const tunnelDestGroup = {
      name: `projects/${projectId}/iap_tunnel/locations/${locationId}/destGroups/${destGroupId}`,
      cidrs: ['10.0.0.1/32'],
    };
    const updateMask = {
      paths: ['cidrs'],
    };

    const request = {
      tunnelDestGroup,
      updateMask,
    };

    const [response] = await client.updateTunnelDestGroup(request);

    console.log(`Updated tunnel destination group: ${response.name}`);
    console.log(`Configured CIDR blocks: ${response.cidrs ? response.cidrs.join(', ') : 'none'}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Destination group not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Request failed with status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateTunnelDestGroup };
// [END iap_v1_identityawareproxyadminservice_tunneldestgroup_update]
