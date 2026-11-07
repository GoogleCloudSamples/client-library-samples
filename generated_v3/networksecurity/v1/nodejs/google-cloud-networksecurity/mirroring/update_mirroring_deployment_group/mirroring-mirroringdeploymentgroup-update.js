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

// [START networksecurity_v1_mirroring_mirroringdeploymentgroup_update]
'use strict';

const {MirroringClient} = require('@google-cloud/network-security').v1;
const {status} = require('@grpc/grpc-js');

const client = new MirroringClient();

/**
 * Updates an existing mirroring deployment group.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID. Mirroring deployment groups are typically global.
 * @param {string} mirroringDeploymentGroupId - The ID of the mirroring deployment group to update.
 */
async function updateMirroringDeploymentGroup(projectId, locationId, mirroringDeploymentGroupId) {
  try {
    const mirroringDeploymentGroup = {
      name: `projects/${projectId}/locations/${locationId}/mirroringDeploymentGroups/${mirroringDeploymentGroupId}`,
      description: 'Updated description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateMirroringDeploymentGroup({
      mirroringDeploymentGroup,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated mirroring deployment group: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Mirroring deployment group not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update mirroring deployment group: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateMirroringDeploymentGroup };
// [END networksecurity_v1_mirroring_mirroringdeploymentgroup_update]
