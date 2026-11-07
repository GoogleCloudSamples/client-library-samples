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

// [START networksecurity_v1alpha1_networksecurity_authorizationpolicies_list]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Lists authorization policies in the specified location.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Google Cloud location ID.
 */
async function listAuthorizationPolicies(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [response] = await client.listAuthorizationPolicies(request);
    for (const policy of response) {
      console.log(`Authorization Policy Name: ${policy.name}`);
      console.log(`Action: ${policy.action}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for location ${locationId}.`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource location ${locationId} not found.`);
    } else {
      console.error(`An API error occurred: ${err.message}`);
    }
  }
}

module.exports = { listAuthorizationPolicies };
// [END networksecurity_v1alpha1_networksecurity_authorizationpolicies_list]
