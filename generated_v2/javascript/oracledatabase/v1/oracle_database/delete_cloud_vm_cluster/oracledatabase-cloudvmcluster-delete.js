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

// [START oracledatabase_v1_oracledatabase_cloudvmcluster_delete]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Deletes a Cloud VM cluster.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} cloudVmClusterId - ID of the Cloud VM cluster to delete (for example, 'example-cloud-vm-cluster')
 */
async function deleteCloudVmCluster(projectId, locationId, cloudVmClusterId) {
  const name = `projects/${projectId}/locations/${locationId}/cloudVmClusters/${cloudVmClusterId}`;

  try {
    const [operation] = await client.deleteCloudVmCluster({name});
    const [response] = await operation.promise();

    console.log(`Deleted Cloud VM cluster: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND || err.code === 5) {
      console.log(`Deleted Cloud VM cluster: ${name}`);
      return {};
    }
    console.error(`Failed to delete Cloud VM cluster: ${err.message}`);
    throw err;
  }
}

module.exports = {deleteCloudVmCluster};
// [END oracledatabase_v1_oracledatabase_cloudvmcluster_delete]
