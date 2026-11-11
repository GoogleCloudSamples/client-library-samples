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

// [START iap_v1_identityawareproxyoauthservice_identityawareproxyclient_get]
'use strict';

const {IdentityAwareProxyOAuthServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyOAuthServiceClient();

/**
 * Retrieves an Identity-Aware Proxy OAuth client.
 *
 * @param {string} brandId - The unique identifier of the OAuth brand under the project (for example, project number).
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} clientId - The server-generated client ID of the Identity-Aware Proxy OAuth client.
 */
async function getIdentityAwareProxyClient(brandId, projectId, clientId) {
  const name = `projects/${projectId}/brands/${brandId}/identityAwareProxyClients/${clientId}`;

  try {
    const request = {
      name,
    };

    const [iapClient] = await client.getIdentityAwareProxyClient(request);

    console.log(`Client retrieved: ${iapClient.name}`);
    console.log(`Display name: ${iapClient.displayName}`);
    return iapClient;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Identity-Aware Proxy client not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing resource: ${name}`);
    } else {
      console.error(`API error retrieving Identity-Aware Proxy client: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIdentityAwareProxyClient };
// [END iap_v1_identityawareproxyoauthservice_identityawareproxyclient_get]
