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

// [START networksecurity_v1beta1_networksecurity_clienttlspolicies_list]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Lists the ClientTlsPolicies in a given project and location.
 *
 * @param {string} project_id - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location_id - The Google Cloud location (for example, 'global' or 'us-central1').
 */
async function listClientTlsPolicies(project_id, location_id) {
  try {
    const projectId =
      project_id ||
      process.env.GOOGLE_CLOUD_PROJECT ||
      process.env.PROJECT_ID ||
      (client.getProjectId ? await client.getProjectId() : undefined);
    const locationId = location_id || process.env.LOCATION_ID || 'global';
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [policies] = await client.listClientTlsPolicies({
      parent,
    });

    if (policies.length === 0) {
      console.log('No client TLS policies found.');
    } else {
      for (const policy of policies) {
        console.log(`Policy: ${policy.name}`);
        if (policy.description) {
          console.log(`Description: ${policy.description}`);
        }
      }
    }

    return policies;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list client TLS policies: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {listClientTlsPolicies};
// [END networksecurity_v1beta1_networksecurity_clienttlspolicies_list]
