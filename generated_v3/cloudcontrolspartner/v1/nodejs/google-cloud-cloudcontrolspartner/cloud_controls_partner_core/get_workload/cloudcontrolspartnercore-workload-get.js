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

// [START cloudcontrolspartner_v1_cloudcontrolspartnercore_workload_get]
'use strict';

const {CloudControlsPartnerCoreClient} = require('@google-cloud/cloudcontrolspartner');
const {status} = require('@grpc/grpc-js');

const client = new CloudControlsPartnerCoreClient();

/**
 * Use the getWorkload method
 *
 * @param {string} organizationId - ID of the Organization (for example, 'example-organization-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} customerId - ID of the Customer (for example, 'example-customer-id')
 * @param {string} workloadId - ID of the Workload (for example, 'example-workload-id')
 */
async function getWorkload(organizationId, locationId, customerId, workloadId) {
  try {
    const name = client.workloadPath(
      organizationId,
      locationId,
      customerId,
      workloadId
    );

    const request = {
      name,
    };

    const [workload] = await client.getWorkload(request);
    console.log(`Retrieved workload: ${workload.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workload not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getWorkload };
// [END cloudcontrolspartner_v1_cloudcontrolspartnercore_workload_get]
