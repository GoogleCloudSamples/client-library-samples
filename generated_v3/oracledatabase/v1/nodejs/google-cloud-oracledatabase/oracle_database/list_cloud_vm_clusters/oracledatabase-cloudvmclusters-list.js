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

// [START oracledatabase_v1_oracledatabase_cloudvmclusters_list]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Lists Cloud VM clusters in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 */
async function listCloudVmClusters(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const request = {
      parent,
    };

    const [clusters] = await client.listCloudVmClusters(request);
    if (!clusters || clusters.length === 0) {
      console.log('No Cloud VM clusters found.');
      return;
    }

    for (const cluster of clusters) {
      console.log(`Cloud VM Cluster name: ${cluster.name}`);
      console.log(`Display name: ${cluster.displayName}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while listing Cloud VM clusters:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Target resource not found:', err.message);
    } else {
      console.error('Failed to list Cloud VM clusters:', err.message || err);
    }
  }
}

module.exports = { listCloudVmClusters };
// [END oracledatabase_v1_oracledatabase_cloudvmclusters_list]
