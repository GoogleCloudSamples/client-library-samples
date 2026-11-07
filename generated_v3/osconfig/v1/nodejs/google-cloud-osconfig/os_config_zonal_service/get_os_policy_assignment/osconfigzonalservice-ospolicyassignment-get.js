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

// [START osconfig_v1_osconfigzonalservice_ospolicyassignment_get]
'use strict';

const {OsConfigZonalServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigZonalServiceClient();

/**
 * Use the getOSPolicyAssignment method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud zone where the OS policy assignment is located (for example, 'us-central1-a').
 * @param {string} osPolicyAssignmentId - The logical ID of the OS policy assignment to retrieve.
 */
async function getOsPolicyAssignment(projectId, locationId, osPolicyAssignmentId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/osPolicyAssignments/${osPolicyAssignmentId}`;

    const request = {
      name,
    };

    const [response] = await client.getOSPolicyAssignment(request);

    console.log(`Retrieved OS policy assignment: ${response.name}`);
    console.log(`Rollout state: ${response.rolloutState}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`OS policy assignment not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing OS policy assignment: ${err.message}`);
    } else {
      console.error(`Failed to retrieve OS policy assignment: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getOsPolicyAssignment };
// [END osconfig_v1_osconfigzonalservice_ospolicyassignment_get]
