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

// [START netapp_v1_netapp_hostgroup_create]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Use the createHostGroup method
 *
 * @param {string} hostGroupId - Caller-chosen identifier for the host group. Must contain only letters, numbers, and hyphens (up to 63 characters), start with a letter or underscore, and end with a letter, underscore, or number (for example, 'sample-host-group').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the host group.
 */
async function createHostGroup(hostGroupId, projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const hostGroup = {
      type: 'ISCSI_INITIATOR',
      hosts: ['iqn.1994-05.com.redhat:host-1'],
      osType: 'LINUX',
    };

    const request = {
      parent,
      hostGroupId,
      hostGroup,
    };

    const [operation] = await client.createHostGroup(request);
    const [response] = await operation.promise();

    console.log(`Host group created: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Host group already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createHostGroup };
// [END netapp_v1_netapp_hostgroup_create]
