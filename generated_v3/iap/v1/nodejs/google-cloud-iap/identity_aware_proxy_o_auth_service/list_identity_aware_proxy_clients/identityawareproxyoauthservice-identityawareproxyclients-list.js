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

// [START iap_v1_identityawareproxyoauthservice_identityawareproxyclients_list]
'use strict';

const {IdentityAwareProxyOAuthServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyOAuthServiceClient();

/**
 * Use the listIdentityAwareProxyClients method
 *
 * @param {string} brandId - The ID of the OAuth brand, server-generated upon brand creation or matching the project number.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listIdentityAwareProxyClients(brandId, projectId) {
  try {
    const parent = `projects/${projectId}/brands/${brandId}`;
    const request = {
      parent,
    };

    const [clients] = await client.listIdentityAwareProxyClients(request);
    for (const iapClient of clients) {
      console.log(`Client: ${iapClient.name}`);
      console.log(`Display name: ${iapClient.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Brand resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listIdentityAwareProxyClients };
// [END iap_v1_identityawareproxyoauthservice_identityawareproxyclients_list]
