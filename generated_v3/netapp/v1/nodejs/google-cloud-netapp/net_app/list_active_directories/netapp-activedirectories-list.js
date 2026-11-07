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

// [START netapp_v1_netapp_activedirectories_list]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Use the listActiveDirectories method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region/location ID.
 */
async function listActiveDirectories(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [activeDirectories] = await client.listActiveDirectories({
      parent,
    });

    for (const directory of activeDirectories) {
      console.log(`Active Directory: ${directory.name}`);
      console.log(`Domain: ${directory.domain}`);
      console.log(`State: ${directory.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Failed to list Active Directory configurations: ${err.message}`);
    }
  }
}

module.exports = { listActiveDirectories };
// [END netapp_v1_netapp_activedirectories_list]
