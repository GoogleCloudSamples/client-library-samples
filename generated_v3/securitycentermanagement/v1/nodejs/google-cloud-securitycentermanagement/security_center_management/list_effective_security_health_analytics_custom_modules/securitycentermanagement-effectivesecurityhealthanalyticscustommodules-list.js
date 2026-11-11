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

// [START securitycentermanagement_v1_securitycentermanagement_effectivesecurityhealthanalyticscustommodules_list]
'use strict';

const {SecurityCenterManagementClient} = require('@google-cloud/securitycentermanagement');
const {status} = require('@grpc/grpc-js');

const client = new SecurityCenterManagementClient();

/**
 * Lists effective Security Health Analytics custom modules in a given location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global').
 */
async function listEffectiveSecurityHealthAnalyticsCustomModules(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [modules] = await client.listEffectiveSecurityHealthAnalyticsCustomModules(request);

    if (!modules.length) {
      console.log('No effective Security Health Analytics custom modules found.');
      return;
    }

    console.log(`Retrieved ${modules.length} effective custom module(s):`);
    for (const customModule of modules) {
      console.log(`Custom module name: ${customModule.name}`);
      console.log(`Display name: ${customModule.displayName}`);
      console.log(`Enablement state: ${customModule.enablementState}`);
    }
  } catch (err) {
    if (typeof err.code === 'number') {
      switch (err.code) {
        case status.INVALID_ARGUMENT:
          console.error(`Invalid argument: ${err.message}`);
          break;
        case status.PERMISSION_DENIED:
          console.error(`Permission denied: ${err.message}`);
          break;
        case status.NOT_FOUND:
          console.error(`Resource not found: ${err.message}`);
          break;
        default:
          console.error(`API error (${err.code}): ${err.message}`);
          break;
      }
    } else {
      throw err;
    }
  }
}

module.exports = { listEffectiveSecurityHealthAnalyticsCustomModules };
// [END securitycentermanagement_v1_securitycentermanagement_effectivesecurityhealthanalyticscustommodules_list]
