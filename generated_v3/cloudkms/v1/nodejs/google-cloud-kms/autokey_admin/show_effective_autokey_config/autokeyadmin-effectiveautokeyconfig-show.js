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

// [START cloudkms_v1_autokeyadmin_show_effective_autokey_config]
'use strict';

const {AutokeyAdminClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new AutokeyAdminClient();

/**
 * Use the showEffectiveAutokeyConfig method
 *
 * @param {string} projectId - The Google Cloud project ID of the resource project whose effective Autokey configuration is being retrieved.
 */
async function showEffectiveAutokeyConfig(projectId) {
  const parent = `projects/${projectId}`;

  try {
    const [response] = await client.showEffectiveAutokeyConfig({
      parent,
    });

    console.log(`Key project: ${response.keyProject}`);
    return response;
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied retrieving Autokey configuration for ${parent}: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for ${parent}: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid parent argument provided (${parent}): ${err.message}`);
    } else {
      console.error(`Error retrieving effective Autokey configuration: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { showEffectiveAutokeyConfig };
// [END cloudkms_v1_autokeyadmin_show_effective_autokey_config]
