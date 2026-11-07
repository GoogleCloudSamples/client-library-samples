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

// [START cloudkms_v1_hsmmanagement_singletenanthsminstances_list]
'use strict';

const {HsmManagementClient} = require('@google-cloud/kms');
const {status} = require('@grpc/grpc-js');

const client = new HsmManagementClient();

/**
 * Use the listSingleTenantHsmInstances method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listSingleTenantHsmInstances(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const request = {
      parent,
    };

    const [instances] = await client.listSingleTenantHsmInstances(request);

    for (const instance of instances) {
      console.log(`Instance: ${instance.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for parent resource: ${err.message}`);
    } else {
      console.error(`Failed to list single-tenant HSM instances: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listSingleTenantHsmInstances };
// [END cloudkms_v1_hsmmanagement_singletenanthsminstances_list]
