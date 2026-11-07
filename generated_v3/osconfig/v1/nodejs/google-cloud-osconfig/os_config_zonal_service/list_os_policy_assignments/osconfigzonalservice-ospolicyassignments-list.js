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

// [START osconfig_v1_osconfigzonalservice_ospolicyassignments_list]
'use strict';

const {OsConfigZonalServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigZonalServiceClient();

/**
 * Lists OS policy assignments in a given zone.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud zone or location (for example, "us-central1-a").
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
      : response.osPolicyAssignments || [];

    if (assignments.length === 0) {
      console.log('No OS policy assignments found.');
    } else {
      for (const assignment of assignments) {
        console.log(`OS Policy Assignment: ${assignment.name}`);
        console.log(`Description: ${assignment.description}`);
        console.log(`Baseline: ${assignment.baseline}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listOsPolicyAssignments };
// [END osconfig_v1_osconfigzonalservice_ospolicyassignments_list]
