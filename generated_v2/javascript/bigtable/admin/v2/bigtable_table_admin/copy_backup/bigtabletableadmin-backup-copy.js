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

// [START bigtable_v2_bigtabletableadmin_copy_backup]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Copies an existing Bigtable backup to a specified destination cluster.
 *
 * @param {string} projectId - Destination project ID.
 * @param {string} instanceId - Destination instance ID.
 * @param {string} clusterId - Destination cluster ID.
 * @param {string} backupId - Identifier for the new backup copy.
 * @param {string} sourceBackup - Full resource path of the source backup.
 */
async function copyBackup(projectId, instanceId, clusterId, backupId, sourceBackup) {
  try {
    const parent = `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`;
    const expireTime = {
      seconds: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      nanos: 0,
    };

    const request = {
      parent,
      backupId,
      sourceBackup,
      expireTime,
    };

    const [operation] = await client.copyBackup(request);
    const [response] = await operation.promise();

    console.log(`Copied backup created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Backup ${backupId} already exists.`);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Destination cluster or source backup not found.');
    } else if (err.code) {
      console.error(`RPC failed with status ${err.code}: ${err.message}`);
    } else {
      console.error(`Failed to copy backup: ${err.message}`);
    }
  }
}

module.exports = { copyBackup };
// [END bigtable_v2_bigtabletableadmin_copy_backup]
