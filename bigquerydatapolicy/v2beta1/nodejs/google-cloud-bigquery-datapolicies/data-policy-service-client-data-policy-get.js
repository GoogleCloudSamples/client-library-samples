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

const process = require('process');

// [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_get]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2beta1;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Retrieves a specific data policy by its resource name.
 *
 * This sample demonstrates how to get details of an existing data policy.
 * It's useful for verifying the configuration of a data policy or for
 * programmatic access to its properties.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-123')
 * @param {string} location The Google Cloud location of the data policy (e.g., 'us')
 * @param {string} dataPolicyId The ID of the data policy to retrieve (e.g., 'my-data-policy')
 */
async function getDataPolicy(
  projectId,
  location = 'us',
  dataPolicyId = 'my-data-policy',
) {
  const name = client.dataPolicyPath(projectId, location, dataPolicyId);

  const request = {
    name: name,
  };

  try {
    const [dataPolicy] = await client.getDataPolicy(request);
    console.log(`Successfully retrieved Data Policy: ${dataPolicy.name}`);
    console.log(`  Data Policy ID: ${dataPolicy.dataPolicyId}`);
    console.log(`  Type: ${dataPolicy.dataPolicyType}`);
    if (dataPolicy.policyTag) {
      console.log(`  Policy Tag: ${dataPolicy.policyTag}`);
    }
    if (dataPolicy.grantees && dataPolicy.grantees.length > 0) {
      console.log(`  Grantees: ${dataPolicy.grantees.join(', ')}`);
    }
    if (dataPolicy.dataMaskingPolicy) {
      console.log(
        `  Data Masking Policy: ${dataPolicy.dataMaskingPolicy.predefinedExpression}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Data Policy '${dataPolicyId}' not found in location '${location}' for project '${projectId}'.`,
      );
      console.error(
        'Ensure the data policy exists and the project/location are correct.',
      );
    } else {
      console.error('Error getting data policy:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_get]

module.exports = {
  getDataPolicy,
};

