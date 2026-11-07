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

// [START workstations_v1_workstations_workstationcluster_create]
'use strict';

const {WorkstationsClient} = require('@google-cloud/workstations');
const {status} = require('@grpc/grpc-js');

const client = new WorkstationsClient();

/**
 * Creates a workstation cluster in the specified location.
 *
 * @param {string} workstationClusterId The ID of the workstation cluster.
 */
async function createWorkstationCluster(workstationClusterId) {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectId}/locations/${location}`;
    const workstationCluster = {
      network: `projects/${projectId}/global/networks/default`,
      subnetwork: `projects/${projectId}/regions/${location}/subnetworks/default`,
    };

    const request = {
      parent,
      workstationClusterId,
      workstationCluster,
    };

    // Initiates the long-running cluster creation operation
    const [operation] = await client.createWorkstationCluster(request);
    const [response] = await operation.promise();

    console.log(`Created workstation cluster: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Workstation cluster already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error occurred: ${err.message}`);
    }
  }
}

module.exports = { createWorkstationCluster };
// [END workstations_v1_workstations_workstationcluster_create]
