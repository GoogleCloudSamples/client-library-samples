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

// [START networksecurity_v1alpha1_networksecurity_urllists_list]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security').v1alpha1;
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Lists URL lists in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listUrlLists(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [urlLists] = await client.listUrlLists(request);
    for (const urlList of urlLists) {
      console.log(`URL List: ${urlList.name}`);
      console.log(`Values: ${urlList.values ? urlList.values.join(', ') : 'None'}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`RPC error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { listUrlLists };
// [END networksecurity_v1alpha1_networksecurity_urllists_list]
