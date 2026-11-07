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

// [START osconfig_v1alpha_osconfigzonalservice_ospolicyassignments_list]
'use strict';

const {OsConfigZonalServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigZonalServiceClient();

/**
 * Lists OS policy assignments for a project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Compute Engine zone (location), such as 'us-central1-a'.
 */
async function listOsPolicyAssignments(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [response] = await client.listOSPolicyAssignments(request);
    const assignments = Array.isArray(response)
      ? response
      : response?.osPolicyAssignments || [];

    console.log(`OS policy assignments in ${parent}:`);
    for (const assignment of assignments) {
      console.log(`- Assignment: ${assignment.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listOsPolicyAssignments };
// [END osconfig_v1alpha_osconfigzonalservice_ospolicyassignments_list]
