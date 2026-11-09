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

// [START networksecurity_v1alpha1_mirroring_mirroringdeploymentgroup_get]
'use strict';

const {MirroringClient} = require('@google-cloud/network-security').v1alpha1;
const {status} = require('@grpc/grpc-js');

const client = new MirroringClient();

/**
 * Gets a MirroringDeploymentGroup.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} mirroringDeploymentGroupId - The ID of the MirroringDeploymentGroup (for example, 'example-mirroringdeploymentgroup-id')
 */
async function getMirroringDeploymentGroup(projectId, locationId, mirroringDeploymentGroupId) {
  try {
    const name = client.mirroringDeploymentGroupPath(
      projectId,
      locationId,
      mirroringDeploymentGroupId
    );

    const [mirroringDeploymentGroup] = await client.getMirroringDeploymentGroup({
      name,
    });

    console.log(`Mirroring deployment group: ${mirroringDeploymentGroup.name}`);
    console.log(`State: ${mirroringDeploymentGroup.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Mirroring deployment group not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getMirroringDeploymentGroup };
// [END networksecurity_v1alpha1_mirroring_mirroringdeploymentgroup_get]
