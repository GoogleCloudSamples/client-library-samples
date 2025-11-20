// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2;
const {status} = require('@grpc/grpc-js');

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_get]
const client = new DataPolicyServiceClient();

/**
 * Retrieves a specific data policy by its resource name.
 *
 * This sample demonstrates how to fetch the details of an existing data policy.
 * Data policies are used to define rules for data masking or row-level security
 * on BigQuery tables.
 *
 * @param {string} projectId Your Google Cloud project ID (for example, 'example-project-123')
 * @param {string} [location='us'] The Google Cloud location of the data policy (for example, 'us', 'europe-west2').
 * @param {string} [dataPolicyId='example-data-policy'] The ID of the data policy to retrieve.
 */
async function getDataPolicy(
  projectId,
  location = 'us',
  dataPolicyId = 'example-data-policy',
) {
  const name = client.dataPolicyPath(projectId, location, dataPolicyId);

  const request = {
    name,
  };

  try {
    const [dataPolicy] = await client.getDataPolicy(request);
    console.log('Successfully retrieved data policy:');
    console.log(`  Name: ${dataPolicy.name}`);
    console.log(`  Type: ${dataPolicy.dataPolicyType}`);
    if (dataPolicy.dataMaskingPolicy) {
      console.log(
        `  Data Masking Policy: ${dataPolicy.dataMaskingPolicy.predefinedExpression || dataPolicy.dataMaskingPolicy.routine}`,
      );
    }
    if (dataPolicy.grantees && dataPolicy.grantees.length > 0) {
      console.log(`  Grantees: ${dataPolicy.grantees.join(', ')}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Data policy '${dataPolicyId}' not found in location '${location}' for project '${projectId}'.`,
      );
      console.error(
        'Make sure the data policy ID, project ID, and location are correct.',
      );
    } else {
      console.error('Error retrieving data policy:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_get]

module.exports = {
  getDataPolicy,
};
