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

// [START discoveryengine_v1_cmekconfigservice_cmekconfigs_list]
'use strict';

const {CmekConfigServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new CmekConfigServiceClient();

/**
 * Lists CMEK configurations in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us').
 */
async function listCmekConfigs(projectId, locationId) {
  const parent = `projects/${projectId}/locations/${locationId}`;

  try {
    const request = {
      parent,
    };

    const [response] = await client.listCmekConfigs(request);

    console.log(`Listed CMEK configurations for ${parent}.`);
    const cmekConfigs = Array.isArray(response)
      ? response
      : response.cmekConfigs || [];

    if (cmekConfigs.length === 0) {
      console.log('No CMEK configurations found.');
    } else {
      for (const cmekConfig of cmekConfigs) {
        console.log(`CMEK config name: ${cmekConfig.name}`);
        console.log(`KMS key: ${cmekConfig.kmsKey}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for parent ${parent}: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for parent ${parent}: ${err.message}`);
    } else {
      console.error(`API operation failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listCmekConfigs };
// [END discoveryengine_v1_cmekconfigservice_cmekconfigs_list]
