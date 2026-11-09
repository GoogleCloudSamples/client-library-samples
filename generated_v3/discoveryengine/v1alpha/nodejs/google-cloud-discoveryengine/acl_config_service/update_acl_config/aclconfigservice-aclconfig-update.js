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

// [START discoveryengine_v1alpha_aclconfigservice_aclconfig_update]
'use strict';

const {v1alpha} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const {AclConfigServiceClient} = v1alpha;

/**
 * Updates an ACL configuration.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID, such as 'global'.
 */
async function updateAclConfig(projectId, locationId) {
  try {
    // When targeting a location other than 'global', configure the client endpoint accordingly.
    const apiClient =
      locationId === 'global'
        ? new AclConfigServiceClient()
        : new AclConfigServiceClient({
            apiEndpoint: `${locationId}-discoveryengine.googleapis.com`,
          });

    // UpdateAclConfig performs a full replacement.
    // Retrieve existing configuration with GetAclConfig first to preserve existing settings.
    const aclConfig = {
      name: `projects/${projectId}/locations/${locationId}/aclConfig`,
      idpConfig: {
        idpType: 'GSUITE',
      },
    };

    const request = {
      aclConfig,
    };

    const [response] = await apiClient.updateAclConfig(request);

    console.log(`Updated ACL configuration: ${response.name}`);
    if (response.idpConfig) {
      console.log(`IDP type: ${response.idpConfig.idpType}`);
    }

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`ACL configuration not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (status ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {updateAclConfig};
// [END discoveryengine_v1alpha_aclconfigservice_aclconfig_update]
