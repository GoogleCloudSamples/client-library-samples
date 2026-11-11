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

// [START iap_v1_identityawareproxyoauthservice_reset_identity_aware_proxy_client_secret]
'use strict';

const {IdentityAwareProxyOAuthServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyOAuthServiceClient();

/**
 * Resets the secret for an Identity-Aware Proxy OAuth client.
 *
 * @param {string} brandId - The server-generated ID of the OAuth brand (often the project number).
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} clientId - The server-generated ID of the Identity Aware Proxy OAuth client.
 */
async function resetIdentityAwareProxyClientSecret(brandId, projectId, clientId) {
  try {
    const name = `projects/${projectId}/brands/${brandId}/identityAwareProxyClients/${clientId}`;

    const request = {
      name,
    };

    const [response] = await client.resetIdentityAwareProxyClientSecret(request);

    console.log(`Reset secret for client: ${response.name}`);
    console.log(`New secret: ${response.secret}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Client not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { resetIdentityAwareProxyClientSecret };
// [END iap_v1_identityawareproxyoauthservice_reset_identity_aware_proxy_client_secret]
