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

// [START cloudkms_v1_hsmmanagement_singletenanthsminstance_get]
'use strict';

const {HsmManagementClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new HsmManagementClient();

/**
 * Retrieves a single-tenant HSM instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the single-tenant HSM instance.
 * @param {string} singleTenantHsmInstanceId - The identifier of the single-tenant HSM instance.
 */
async function getSingleTenantHsmInstance(projectId, locationId, singleTenantHsmInstanceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/singleTenantHsmInstances/${singleTenantHsmInstanceId}`;

    const [instance] = await client.getSingleTenantHsmInstance({
      name,
    });

    console.log(`Instance Name: ${instance.name}`);
    console.log(`Instance State: ${instance.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`gRPC error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getSingleTenantHsmInstance };
// [END cloudkms_v1_hsmmanagement_singletenanthsminstance_get]
