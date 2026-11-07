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

// [START oracledatabase_v1_oracledatabase_exadbvmclusters_list]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Use the listExadbVmClusters method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listExadbVmClusters(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [clusters] = await client.listExadbVmClusters(request);

    if (!clusters || clusters.length === 0) {
      console.log('No Exadata VM clusters found.');
      return;
    }

    console.log(`Found ${clusters.length} Exadata VM cluster(s):`);
    for (const cluster of clusters) {
      console.log(`- Name: ${cluster.name}`);
      console.log(`  State: ${cluster.currentState}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error (${err.code}): ${err.message}`);
    }
  }
}

module.exports = { listExadbVmClusters };
// [END oracledatabase_v1_oracledatabase_exadbvmclusters_list]
