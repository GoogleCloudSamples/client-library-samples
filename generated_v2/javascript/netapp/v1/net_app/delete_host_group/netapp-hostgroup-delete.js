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

// [START netapp_v1_netapp_hostgroup_delete]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Deletes a NetApp host group.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} hostGroupId - ID of the HostGroup (for example, 'example-hostgroup-id')
 */
async function deleteHostGroup(locationId, hostGroupId) {
  try {
    const projectNumber = await client.getProjectId();
    const name = `projects/${projectNumber}/locations/${locationId}/hostGroups/${hostGroupId}`;

    const [operation] = await client.deleteHostGroup({
      name,
    });
    await operation.promise();

    console.log(`Deleted host group: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Host group not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (status ${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { deleteHostGroup };
// [END netapp_v1_netapp_hostgroup_delete]
