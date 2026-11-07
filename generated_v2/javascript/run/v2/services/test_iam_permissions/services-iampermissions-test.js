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

// [START run_v2_services_test_iam_permissions]
'use strict';

const {ServicesClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new ServicesClient();

/**
 * Tests IAM permissions for a Cloud Run service.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Cloud Run service is deployed (for example, 'us-central1').
 * @param {string} serviceId - The unique identifier of the Cloud Run service.
 */
async function testIamPermissions(projectId, locationId, serviceId) {
  try {
    const permissions = ['run.services.get', 'run.services.update'];
    const resource = `projects/${projectId}/locations/${locationId}/services/${serviceId}`;

    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    console.log(`Granted permissions: ${(response.permissions || []).join(', ')}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`API error (status ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { testIamPermissions };
// [END run_v2_services_test_iam_permissions]
