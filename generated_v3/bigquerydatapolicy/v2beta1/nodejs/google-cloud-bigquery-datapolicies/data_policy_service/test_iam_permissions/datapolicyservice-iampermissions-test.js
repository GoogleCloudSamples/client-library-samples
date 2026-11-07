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

// [START bigquerystorage_v2beta1_datapolicyservice_test_iam_permissions]
'use strict';

const {DataPolicyServiceClient} = require('@google-cloud/bigquery-datapolicies');
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Tests IAM permissions for a BigQuery data policy.
 */
async function testIamPermissions() {
  try {
    const resource = 'projects/example-project-id/locations/example-location/dataPolicies/example-data-policy';
    const permissions = 'bigquery.dataPolicies.get';

    const request = {
      resource,
      permissions: [permissions],
    };

    const [response] = await client.testIamPermissions(request);
    console.log('Granted permissions:');
    for (const permission of response.permissions || []) {
      console.log(`- ${permission}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END bigquerystorage_v2beta1_datapolicyservice_test_iam_permissions]
