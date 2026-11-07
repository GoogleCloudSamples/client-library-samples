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

// [START analyticshub_v1beta1_analyticshubservice_test_iam_permissions]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-data-exchange');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Tests IAM permissions for a data exchange resource.
 *
 * @param {string} projectId - The Google Cloud project ID containing the data exchange.
 * @param {string} locationId - The geographic location of the data exchange (for example, 'us' or 'us-central1').
 * @param {string} dataExchangeId - The ID of the data exchange.
 */
async function testIamPermissions(projectId, locationId, dataExchangeId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}`;
    const permissions = ['analyticshub.dataExchanges.get'];

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);
    console.log(`Allowed permissions: ${(response.permissions || []).join(', ')}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END analyticshub_v1beta1_analyticshubservice_test_iam_permissions]
