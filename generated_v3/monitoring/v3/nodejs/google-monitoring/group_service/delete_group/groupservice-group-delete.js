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

// [START monitoring_v3_groupservice_group_delete]
'use strict';

const {GroupServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new GroupServiceClient();

/**
 * Deletes a Cloud Monitoring group.
 *
 * @param {string} groupId - The server-assigned ID of the Monitoring group to delete.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function deleteGroup(groupId, projectId) {
  try {
    const name = `projects/${projectId}/groups/${groupId}`;
    const request = {
      name,
    };

    await client.deleteGroup(request);
    console.log(`Deleted group: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Group not found: ${projectId}/${groupId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for group: ${projectId}/${groupId}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed for group: ${projectId}/${groupId}`);
    } else {
      console.error(`Failed to delete group: ${err.message}`);
    }
  }
}

module.exports = { deleteGroup };
// [END monitoring_v3_groupservice_group_delete]
