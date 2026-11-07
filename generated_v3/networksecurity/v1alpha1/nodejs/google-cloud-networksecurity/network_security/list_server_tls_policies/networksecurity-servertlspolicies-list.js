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

// [START networksecurity_v1alpha1_networksecurity_servertlspolicies_list]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

/**
 * Lists Server TLS policies in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listServerTlsPolicies(projectId, locationId) {
  const client = new NetworkSecurityClient();
  const parent = `projects/${projectId}/locations/${locationId}`;

  try {
    const [policies] = await client.listServerTlsPolicies({
      parent,
    });

    for (const policy of policies) {
      console.log(`Server TLS policy name: ${policy.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else {
      console.error('Failed to list Server TLS policies:', err);
    }
  }
}

module.exports = { listServerTlsPolicies };
// [END networksecurity_v1alpha1_networksecurity_servertlspolicies_list]
