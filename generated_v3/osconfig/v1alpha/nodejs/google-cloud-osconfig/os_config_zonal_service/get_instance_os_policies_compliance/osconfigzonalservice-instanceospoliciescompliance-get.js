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

// [START osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliance_get]
'use strict';

const {OsConfigZonalServiceClient} = require('@google-cloud/os-config').v1alpha;
const {status} = require('@grpc/grpc-js');

const client = new OsConfigZonalServiceClient();

/**
 * Gets OS policies compliance data for a specific Compute Engine VM instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location (Compute Engine zone, for example 'us-central1-a') where the target VM instance resides.
 * @param {string} instanceOsPoliciesComplianceId - The identifier of the instance OS policies compliance resource, representing the Compute Engine VM instance name or ID.
 */
async function getInstanceOsPoliciesCompliance(projectId, locationId, instanceOsPoliciesComplianceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/instanceOSPoliciesCompliances/${instanceOsPoliciesComplianceId}`;

    const request = {
      name,
    };

    const [compliance] = await client.getInstanceOSPoliciesCompliance(request);

    console.log(`Resource: ${compliance.name}`);
    console.log(`Instance: ${compliance.instance}`);
    console.log(`State: ${compliance.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance OS policies compliance record not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing compliance record: ${err.message}`);
    } else {
      console.error(`Error retrieving instance OS policies compliance: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getInstanceOsPoliciesCompliance };
// [END osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliance_get]
