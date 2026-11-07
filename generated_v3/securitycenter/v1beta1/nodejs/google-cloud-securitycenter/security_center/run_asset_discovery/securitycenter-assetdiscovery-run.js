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

// [START securitycenter_v1beta1_securitycenter_run_asset_discovery]
'use strict';

const {SecurityCenterClient} = require('@google-cloud/security-center');
const {status} = require('@grpc/grpc-js');

const client = new SecurityCenterClient();

/**
 * Use the runAssetDiscovery method
 *
 * @param {string} organizationId - The server-generated ID of the organization (for example, '1081639148624'). Read from an existing organization resource.
 */
async function runAssetDiscovery(organizationId) {
  try {
    const parent = `organizations/${organizationId}`;

    const [operation] = await client.runAssetDiscovery({parent});
    console.log(`Asset discovery initiated. Operation: ${operation.name}`);

    const [response] = await operation.promise();
    console.log('Asset discovery completed successfully.');
    console.log(`Operation result: ${JSON.stringify(response)}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Google API Error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { runAssetDiscovery };
// [END securitycenter_v1beta1_securitycenter_run_asset_discovery]
