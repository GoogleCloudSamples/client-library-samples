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

// [START dataform_v1beta1_dataform_config_update]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Updates the Dataform configuration for a location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 * @param {string} cryptoKeyId - The resource name of an existing Cloud KMS CryptoKey to set as the default KMS key.
 */
async function updateConfig(projectId, locationId, cryptoKeyId) {
  try {
    const config = {
      name: `projects/${projectId}/locations/${locationId}/config`,
      defaultKmsKeyName: cryptoKeyId,
    };
    const updateMask = {
      paths: ['default_kms_key_name'],
    };

    const [response] = await client.updateConfig({
      config,
      updateMask,
    });

    console.log(`Updated configuration: ${response.name}`);
    console.log(`Default KMS key name: ${response.defaultKmsKeyName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Dataform configuration not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing configuration: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Dataform updateConfig failed: ${err.message}`);
    }
  }
}

module.exports = { updateConfig };
// [END dataform_v1beta1_dataform_config_update]
