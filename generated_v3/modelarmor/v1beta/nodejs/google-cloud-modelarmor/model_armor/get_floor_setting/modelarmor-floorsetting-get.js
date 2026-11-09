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

// [START modelarmor_v1beta_modelarmor_floorsetting_get]
'use strict';

const {ModelArmorClient} = require('@google-cloud/modelarmor');
const {status} = require('@grpc/grpc-js');

const client = new ModelArmorClient();

/**
 * Use the getFloorSetting method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID, such as 'global'.
 */
async function getFloorSetting(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/floorSetting`;
    const request = {
      name,
    };

    const [response] = await client.getFloorSetting(request);
    console.log(`Retrieved floor setting: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Floor setting not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getFloorSetting };
// [END modelarmor_v1beta_modelarmor_floorsetting_get]
