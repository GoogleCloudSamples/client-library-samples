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

// [START securitycentermanagement_v1_securitycentermanagement_eventthreatdetectioncustommodules_list]
'use strict';

const {SecurityCenterManagementClient} = require('@google-cloud/securitycentermanagement');
const {status} = require('@grpc/grpc-js');

const client = new SecurityCenterManagementClient();

/**
 * Use the listEventThreatDetectionCustomModules method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global').
 */
async function listEventThreatDetectionCustomModules(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [modules] = await client.listEventThreatDetectionCustomModules(request);

    console.log(`Listed ${modules.length} Event Threat Detection custom module(s).`);
    for (const customModule of modules) {
      console.log(`Module Name: ${customModule.name}`);
      console.log(`Display Name: ${customModule.displayName}`);
      console.log(`Enablement State: ${customModule.enablementState}`);
      console.log(`Type: ${customModule.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { listEventThreatDetectionCustomModules };
// [END securitycentermanagement_v1_securitycentermanagement_eventthreatdetectioncustommodules_list]
