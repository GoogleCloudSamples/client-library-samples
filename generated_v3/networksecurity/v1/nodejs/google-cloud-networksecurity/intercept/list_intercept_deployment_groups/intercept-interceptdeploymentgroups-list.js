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

// [START networksecurity_v1_intercept_interceptdeploymentgroups_list]
'use strict';

const {v1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new v1.InterceptClient();

/**
 * Lists intercept deployment groups in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud location identifier, typically `global`.
 */
async function listInterceptDeploymentGroups(projectId, locationId) {
  const parent = `projects/${projectId}/locations/${locationId}`;

  try {
    const [deploymentGroups] = await client.listInterceptDeploymentGroups({
      parent,
    });

    console.log(`Retrieved ${deploymentGroups.length} intercept deployment group(s).`);
    for (const group of deploymentGroups) {
      console.log(`- Name: ${group.name}`);
      console.log(`  Network: ${group.network}`);
      console.log(`  State: ${group.state}`);
      console.log(`  Reconciling: ${group.reconciling}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while listing intercept deployment groups for ${parent}: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${parent}: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication failed: ${err.message}`);
    } else {
      console.error(`Failed to list intercept deployment groups: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listInterceptDeploymentGroups };
// [END networksecurity_v1_intercept_interceptdeploymentgroups_list]
