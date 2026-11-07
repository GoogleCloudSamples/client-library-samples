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

// [START netapp_v1_netapp_backuppolicy_delete]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Use the deleteBackupPolicy method.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backupPolicyId - The caller-chosen ID of the backup policy to delete (for example, 'example-backup-policy').
 */
async function deleteBackupPolicy(projectId, locationId, backupPolicyId) {
  const name = `projects/${projectId}/locations/${locationId}/backupPolicies/${backupPolicyId}`;

  try {
    // DeleteBackupPolicy is a long-running operation; initiate request and wait for completion
    const [operation] = await client.deleteBackupPolicy({
      name,
    });
    await operation.promise();

    console.log(`Deleted backup policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup policy not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed when deleting backup policy: ${err.message}`);
    } else {
      console.error(`Failed to delete backup policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteBackupPolicy };
// [END netapp_v1_netapp_backuppolicy_delete]
