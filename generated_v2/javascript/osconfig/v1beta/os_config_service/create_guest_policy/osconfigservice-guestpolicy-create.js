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

// [START osconfig_v1beta_osconfigservice_guestpolicy_create]
'use strict';

const {v1beta} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new v1beta.OsConfigServiceClient();

/**
 * Creates a guest policy in the specified project.
 *
 * @param {string} guestPolicyId - The logical name of the guest policy in the project (for example, 'example-guest-policy'). Must contain only lowercase letters, numbers, and hyphens, start with a letter, end with a letter or number, and be between 1 and 63 characters.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function createGuestPolicy(guestPolicyId, projectId) {
  try {
    const parent = `projects/${projectId}`;
    const guestPolicy = {
      description: 'Example guest policy to install package dependencies across instances',
      assignment: {},
      packages: [
        {
          name: guestPolicyId,
          desiredState: 'INSTALLED',
        },
      ],
    };

    const request = {
      parent,
      guestPolicyId,
      guestPolicy,
    };

    const [response] = await client.createGuestPolicy(request);
    console.log(`Created guest policy: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Guest policy '${guestPolicyId}' already exists in project '${projectId}'.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating guest policy in project '${projectId}'.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for guest policy '${guestPolicyId}': ${err.message}`);
    } else {
      console.error(`Failed to create guest policy: ${err.message || err}`);
    }
    throw err;
  }
}

module.exports = { createGuestPolicy };
// [END osconfig_v1beta_osconfigservice_guestpolicy_create]
