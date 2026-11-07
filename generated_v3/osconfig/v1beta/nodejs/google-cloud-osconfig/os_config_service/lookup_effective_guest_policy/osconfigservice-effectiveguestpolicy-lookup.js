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

// [START osconfig_v1beta_osconfigservice_lookup_effective_guest_policy]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config').v1beta;
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Retrieves effective guest policies for a Compute Engine VM instance.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} zone The Compute Engine zone where the VM instance resides.
 * @param {string} instanceId The Compute Engine VM instance name.
 */
async function lookupEffectiveGuestPolicy(projectId, zone, instanceId) {
  try {
    const instance = `projects/${projectId}/zones/${zone}/instances/${instanceId}`;
    const request = {
      instance,
    };

    const [response] = await client.lookupEffectiveGuestPolicy(request);

    console.log(`Successfully retrieved effective guest policy for ${instance}`);
    if (response.packages) {
      console.log(`Configured packages count: ${response.packages.length}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The target VM instance was not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while retrieving guest policy.');
    } else {
      console.error('Error retrieving effective guest policy:', err.message || err);
    }
  }
}

module.exports = {lookupEffectiveGuestPolicy};
// [END osconfig_v1beta_osconfigservice_lookup_effective_guest_policy]
