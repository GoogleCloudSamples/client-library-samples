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

// [START analyticshub_v1_analyticshubservice_test_iam_permissions]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Tests caller permissions on a data exchange resource.
 *
 * @param {string} projectId - The Google Cloud project ID containing the data exchange.
 * @param {string} locationId - The geographic location where the data exchange resides (for example, 'us' or 'us-central1').
 * @param {string} dataExchangeId - The ID of the data exchange to test permissions on. Must contain only letters, numbers, and underscores.
 */
async function testIamPermissions(projectId, locationId, dataExchangeId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}`;
    const permissions = [
      'analyticshub.dataExchanges.get',
      'analyticshub.dataExchanges.update',
    ];

    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    console.log(`Tested permissions for resource: ${resource}`);
    if (response.permissions && response.permissions.length > 0) {
      console.log('Granted permissions:');
      for (const permission of response.permissions) {
        console.log(`- ${permission}`);
      }
    } else {
      console.log('No permissions granted from the requested set.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error testing permissions: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END analyticshub_v1_analyticshubservice_test_iam_permissions]
