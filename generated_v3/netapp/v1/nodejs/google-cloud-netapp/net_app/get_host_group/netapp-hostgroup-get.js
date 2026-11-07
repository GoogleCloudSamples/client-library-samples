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

// [START netapp_v1_netapp_hostgroup_get]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Retrieves details of a specific NetApp HostGroup.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} hostGroupId - The ID of the HostGroup (for example, 'example-host-group-id').
 */
async function getHostGroup(locationId, hostGroupId) {
  try {
    const projectNumber = await client.getProjectId();
    const name = `projects/${projectNumber}/locations/${locationId}/hostGroups/${hostGroupId}`;

    const [response] = await client.getHostGroup({name});
    console.log(`Host group retrieved: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Host group not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      console.error(err);
    }
  }
}

module.exports = {getHostGroup};
// [END netapp_v1_netapp_hostgroup_get]
