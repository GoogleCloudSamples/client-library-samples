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

// [START networksecurity_v1_mirroring_mirroringdeployments_list]
'use strict';

const {MirroringClient} = require('@google-cloud/network-security').v1;
const {status} = require('@grpc/grpc-js');

const client = new MirroringClient();

/**
 * Lists network security mirroring deployments in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or zone for the mirroring deployments (for example, 'us-central1-a').
 */
async function listMirroringDeployments(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [deployments] = await client.listMirroringDeployments(request);

    if (deployments.length === 0) {
      console.log(`No mirroring deployments found in ${parent}.`);
      return;
    }

    for (const deployment of deployments) {
      console.log(`Name: ${deployment.name}`);
      console.log(`State: ${deployment.state}`);
      console.log(`Forwarding Rule: ${deployment.forwardingRule}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Operation failed: ${err.message}`);
    }
  }
}

module.exports = { listMirroringDeployments };
// [END networksecurity_v1_mirroring_mirroringdeployments_list]
