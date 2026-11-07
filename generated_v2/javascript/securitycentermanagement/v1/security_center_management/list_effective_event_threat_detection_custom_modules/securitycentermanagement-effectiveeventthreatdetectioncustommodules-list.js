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

// [START securitycentermanagement_v1_securitycentermanagement_effectiveeventthreatdetectioncustommodules_list]
'use strict';

const {SecurityCenterManagementClient} = require('@google-cloud/securitycentermanagement');
const {status} = require('@grpc/grpc-js');

const client = new SecurityCenterManagementClient();

/**
 * Lists effective Event Threat Detection custom modules for a project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global').
 */
async function listEffectiveEventThreatDetectionCustomModules(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [modules] = await client.listEffectiveEventThreatDetectionCustomModules(request);
    console.log(`Listed ${modules.length} effective Event Threat Detection custom module(s).`);
    for (const moduleItem of modules) {
      console.log(`Custom module name: ${moduleItem.name}`);
      console.log(`Display name: ${moduleItem.displayName}`);
      console.log(`Enablement state: ${moduleItem.enablementState}`);
      console.log(`Type: ${moduleItem.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listEffectiveEventThreatDetectionCustomModules };
// [END securitycentermanagement_v1_securitycentermanagement_effectiveeventthreatdetectioncustommodules_list]
