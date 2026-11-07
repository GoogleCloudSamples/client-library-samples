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

// [START networksecurity_v1alpha1_sserealmservice_sacrealms_list]
'use strict';

const {v1alpha1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const SSERealmServiceClient =
  v1alpha1.SSERealmServiceClient || v1alpha1.SseRealmServiceClient;
const client = new SSERealmServiceClient();

/**
 * Lists SACRealms in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (must be 'global').
 */
async function listSacRealms(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [response] = client.listSACRealms
      ? await client.listSACRealms(request)
      : await client.listSacRealms(request);

    const realms = Array.isArray(response)
      ? response
      : response?.sacRealms || response?.sac_realms || [];

    for (const realm of realms) {
      console.log(`SAC Realm: ${realm.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`RPC error [code ${err.code}]: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {listSacRealms};
// [END networksecurity_v1alpha1_sserealmservice_sacrealms_list]
