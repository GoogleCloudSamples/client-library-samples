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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroup_delete]
'use strict';

const {IdentityAwareProxyAdminServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyAdminServiceClient();

/**
 * Use the deleteTunnelDestGroup method
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} destGroupId - The ID of the tunnel destination group to delete (must be 4-63 characters containing only lowercase letters and hyphens).
 */
async function deleteTunnelDestGroup(locationId, projectId, destGroupId) {
  const name = `projects/${projectId}/iap_tunnel/locations/${locationId}/destGroups/${destGroupId}`;

  try {
    const request = {
      name,
    };

    await client.deleteTunnelDestGroup(request);
    console.log(`Deleted tunnel destination group: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Tunnel destination group not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while deleting tunnel destination group: ${name}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteTunnelDestGroup };
// [END iap_v1_identityawareproxyadminservice_tunneldestgroup_delete]
