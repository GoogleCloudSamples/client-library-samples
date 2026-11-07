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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceclasses_list]
'use strict';

const {CrossNetworkAutomationServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new CrossNetworkAutomationServiceClient();

/**
 * Lists service classes in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region ID (for example, 'global' or a specific region).
 */
async function listServiceClasses(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [serviceClasses] = await client.listServiceClasses(request);
    console.log(`Listed service classes for ${parent}:`);
    if (serviceClasses.length === 0) {
      console.log('No service classes found.');
    } else {
      for (const serviceClass of serviceClasses) {
        console.log(`- ${serviceClass.name}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listServiceClasses};
// [END networkconnectivity_v1_crossnetworkautomationservice_serviceclasses_list]
