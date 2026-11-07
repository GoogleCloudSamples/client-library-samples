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

// [START networksecurity_v1alpha1_sserealmservice_partnersserealms_list]
'use strict';

const {v1alpha1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const SSERealmServiceClient =
  v1alpha1.SSERealmServiceClient || v1alpha1.SseRealmServiceClient;
const client = new SSERealmServiceClient();

/**
 * Lists partner SSE realms in a specified location.
 *
 * @param {string} projectId - The ID of the Google Cloud project.
 * @param {string} locationId - The Google Cloud region or location ID (for example, 'global' or a specific cloud region).
 */
async function listPartnerSseRealms(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [response] = await client.listPartnerSSERealms(request);
    const realms = Array.isArray(response)
      ? response
      : response?.partnerSseRealms ?? response?.partnerSSERealms ?? [];

    console.log(`Retrieved ${realms.length} partner SSE realm(s).`);
    for (const realm of realms) {
      console.log(`Partner SSE Realm: ${realm.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = {listPartnerSseRealms};
// [END networksecurity_v1alpha1_sserealmservice_partnersserealms_list]
