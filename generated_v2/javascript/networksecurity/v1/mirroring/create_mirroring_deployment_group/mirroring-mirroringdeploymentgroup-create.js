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

// [START networksecurity_v1_mirroring_mirroringdeploymentgroup_create]
'use strict';

const {MirroringClient} = require('@google-cloud/network-security').v1;
const {status} = require('@grpc/grpc-js');

const mirroringClient = new MirroringClient();

/**
 * Creates a Mirroring Deployment Group in Google Cloud Network Security.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} mirroringDeploymentGroupId - ID of the MirroringDeploymentGroup (for example, 'example-mirroringdeploymentgroup-id')
 */
async function createMirroringDeploymentGroup(projectId, locationId, mirroringDeploymentGroupId) {
  try {
    const parent = mirroringClient.locationPath(projectId, locationId);
    const mirroringDeploymentGroup = {
      network: `projects/${projectId}/global/networks/default`,
    };

    const request = {
      parent,
      mirroringDeploymentGroupId,
      mirroringDeploymentGroup,
    };

    const [operation] = await mirroringClient.createMirroringDeploymentGroup(request);
    const [response] = await operation.promise();

    console.log(`Created Mirroring Deployment Group: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Mirroring deployment group ${mirroringDeploymentGroupId} already exists.`);
    } else if (err.code !== undefined) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      console.error('Failed to create mirroring deployment group:', err);
    }
  }
}

module.exports = { createMirroringDeploymentGroup };
// [END networksecurity_v1_mirroring_mirroringdeploymentgroup_create]
