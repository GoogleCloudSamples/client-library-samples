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

// [START iap_v1_identityawareproxyoauthservice_identityawareproxyclient_delete]
'use strict';

const {IdentityAwareProxyOAuthServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyOAuthServiceClient();

/**
 * Deletes an Identity-Aware Proxy OAuth client.
 *
 * @param {string} brandId - The server-generated ID of the OAuth brand.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} clientId - The unique client ID of the Identity-Aware Proxy OAuth client.
 */
async function deleteIdentityAwareProxyClient(brandId, projectId, clientId) {
  try {
    const name = `projects/${projectId}/brands/${brandId}/identityAwareProxyClients/${clientId}`;

    const request = {
      name,
    };

    await client.deleteIdentityAwareProxyClient(request);
    console.log(`Deleted Identity-Aware Proxy OAuth client: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Identity-Aware Proxy OAuth client not found: ${err.message}`);
    } else {
      console.error(`Failed to delete Identity-Aware Proxy OAuth client: ${err.message}`);
    }
  }
}

module.exports = { deleteIdentityAwareProxyClient };
// [END iap_v1_identityawareproxyoauthservice_identityawareproxyclient_delete]
