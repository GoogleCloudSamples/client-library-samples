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

// [START networksecurity_v1alpha1_sserealmservice_sacrealm_create]
'use strict';

const {v1alpha1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new v1alpha1.SSERealmServiceClient();

/**
 * Creates a SACRealm resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} sacRealmId - Caller-chosen unique identifier for the SACRealm resource. Must be 1-63 characters long, start with a lowercase letter, contain only lowercase letters, digits, and hyphens, and end with a lowercase letter or digit (for example, 'example-sac-realm').
 * @param {string} locationId - The Google Cloud location ID. For SACRealm, this must be 'global'.
 */
async function createSacRealm(projectId, sacRealmId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const sacRealm = {
      securityService: 'PALO_ALTO_PRISMA_ACCESS',
    };

    const request = {
      parent,
      sacRealmId,
      sacRealm,
    };

    const [operation] = await client.createSACRealm(request);
    const response =
      typeof operation?.promise === 'function'
        ? (await operation.promise())[0]
        : operation;

    console.log(`Created SACRealm: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`SACRealm already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = {createSacRealm};
// [END networksecurity_v1alpha1_sserealmservice_sacrealm_create]
