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

// [START cloudkms_v1_ekmservice_ekmconfig_get]
'use strict';

const {EkmServiceClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new EkmServiceClient();

/**
 * Retrieves the EkmConfig singleton resource for a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the EkmConfig (for example, 'global' or a regional location).
 */
async function getEkmConfig(projectId, locationId) {
  try {
    const name = client.ekmConfigPath(projectId, locationId);

    const [ekmConfig] = await client.getEkmConfig({
      name,
    });

    console.log(`Retrieved EKM config: ${ekmConfig.name}`);
    if (ekmConfig.defaultKmsKeyVersion) {
      console.log(`Default KMS key version: ${ekmConfig.defaultKmsKeyVersion}`);
    }
    return ekmConfig;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`EKM config not found at specified location: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing EKM config: ${err.message}`);
    } else {
      console.error(`Failed to retrieve EKM config: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getEkmConfig };
// [END cloudkms_v1_ekmservice_ekmconfig_get]
