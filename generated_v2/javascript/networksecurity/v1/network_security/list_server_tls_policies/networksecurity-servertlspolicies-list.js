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

// [START networksecurity_v1_networksecurity_servertlspolicies_list]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Lists server TLS policies in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where ServerTlsPolicies are located (for example, 'global' or 'us-central1').
 */
async function listServerTlsPolicies(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [policies] = await client.listServerTlsPolicies(request);
    for (const policy of policies) {
      console.log(`Policy: ${policy.name}`);
      console.log(`Create time: ${policy.createTime ? policy.createTime.seconds : 'N/A'}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied listing server TLS policies: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`RPC error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listServerTlsPolicies };
// [END networksecurity_v1_networksecurity_servertlspolicies_list]
