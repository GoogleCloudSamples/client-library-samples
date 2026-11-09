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

// [START discoveryengine_v1beta_aclconfigservice_aclconfig_get]
'use strict';

const {v1beta} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new v1beta.AclConfigServiceClient();

/**
 * Retrieves the ACL configuration for the specified location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The resource location, such as 'global'.
 */
async function getAclConfig(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/aclConfig`;

    const request = {
      name,
    };

    const [response] = await client.getAclConfig(request);
    console.log(`Retrieved ACL configuration: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`ACL configuration not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve ACL configuration: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getAclConfig };
// [END discoveryengine_v1beta_aclconfigservice_aclconfig_get]
