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

// [START oracledatabase_v1_oracledatabase_exadbvmcluster_create]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Use the createExadbVmCluster method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} exadbVmClusterId - The caller-chosen ID of the ExadbVmCluster to create (for example, 'my-exadb-cluster'). Must start with a lowercase letter, contain only lowercase letters, numbers, and hyphens, and be 1 to 63 characters long.
 * @param {string} odbNetworkId - The ID of the ODB network to associate with the ExadbVmCluster (for example, 'odb-network-1').
 * @param {string} odbSubnetId - The ID of the client ODB subnet for IP allocation (for example, 'odb-subnet-1').
 * @param {string} backupOdbSubnetId - The ID of the backup ODB subnet for the ExadbVmCluster (for example, 'odb-subnet-2').
 * @param {string} exascaleDbStorageVaultId - The ID of the Exascale DB storage vault associated with the ExadbVmCluster (for example, 'vault-1').
 */
async function createExadbVmCluster(projectId, locationId, exadbVmClusterId, odbNetworkId, odbSubnetId, backupOdbSubnetId, exascaleDbStorageVaultId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const vmFileSystemStorage = {
      sizeInGbsPerNode: 300,
    };

    const properties = {
      exascaleDbStorageVault: `projects/${projectId}/locations/${locationId}/exascaleDbStorageVaults/${exascaleDbStorageVaultId}`,
      gridImageId: '23.4.0.24.05',
      nodeCount: 2,
      enabledEcpuCountPerNode: 8,
      shapeAttribute: 'SMART_STORAGE',
      hostnamePrefix: 'exavm',
      vmFileSystemStorage,
      sshPublicKeys: ['ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIExampleKeyForTestingPurposesOnly'],
    };

    const exadbVmCluster = {
      displayName: 'cluster123',
      odbNetwork: `projects/${projectId}/locations/${locationId}/odbNetworks/${odbNetworkId}`,
      odbSubnet: `projects/${projectId}/locations/${locationId}/odbNetworks/${odbNetworkId}/odbSubnets/${odbSubnetId}`,
      backupOdbSubnet: `projects/${projectId}/locations/${locationId}/odbNetworks/${odbNetworkId}/odbSubnets/${backupOdbSubnetId}`,
      properties,
    };

    const [operation] = await client.createExadbVmCluster({
      parent,
      exadbVmClusterId,
      exadbVmCluster,
    });

    const [response] = await operation.promise();
    console.log(`Created Exadb VM cluster: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Exadb VM cluster ${exadbVmClusterId} already exists:`, err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid cluster configuration argument:', err.message);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error('Precondition failed for cluster creation:', err.message);
    } else {
      console.error('API operation failed:', err.message);
    }
  }
}

module.exports = { createExadbVmCluster };
// [END oracledatabase_v1_oracledatabase_exadbvmcluster_create]
