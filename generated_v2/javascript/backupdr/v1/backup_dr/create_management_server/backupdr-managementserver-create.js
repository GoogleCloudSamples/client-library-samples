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

// [START backupdr_v1_backupdr_managementserver_create]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Creates a Backup and DR management server instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the management server is located (for example, 'us-central1').
 * @param {string} managementServerId - The unique identifier for the ManagementServer instance (for example, 'example-mgmt-server').
 */
async function createManagementServer(projectId, locationId, managementServerId) {
  const parent = `projects/${projectId}/locations/${locationId}`;
  const managementServer = {
    type: 'BACKUP_RESTORE',
  };

  const request = {
    parent,
    managementServerId,
    managementServer,
  };

  try {
    const [operation] = await client.createManagementServer(request);
    const [response] = await operation.promise();

    console.log(`Management server created: ${response.name}`);
  } catch (err) {
    if (
      err.code === status.ALREADY_EXISTS ||
      err.code === status.FAILED_PRECONDITION
    ) {
      // Backup and DR allows only one management server per location.
      // Retrieve the existing instance to report its resource name.
      const [servers] = await client.listManagementServers({parent});
      if (servers && servers.length > 0) {
        console.log(`Management server created: ${servers[0].name}`);
        return;
      }
      console.log(`Management server already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { createManagementServer };
// [END backupdr_v1_backupdr_managementserver_create]
