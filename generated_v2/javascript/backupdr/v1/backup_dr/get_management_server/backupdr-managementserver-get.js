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

// [START backupdr_v1_backupdr_managementserver_get]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Use the getManagementServer method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} managementServerId - The ID of the Backup and DR management server (for example, 'example-management-server'). This ID is caller-specified when creating the management server.
 */
async function getManagementServer(projectId, locationId, managementServerId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/managementServers/${managementServerId}`;

    const [managementServer] = await client.getManagementServer({name});

    console.log(`Management Server Name: ${managementServer.name}`);
    console.log(`Management Server State: ${managementServer.state}`);
    console.log(`Management Server Type: ${managementServer.type}`);
    return managementServer;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Management server not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve management server: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getManagementServer };
// [END backupdr_v1_backupdr_managementserver_get]
