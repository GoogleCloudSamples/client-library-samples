// Copyright 2026 Google LLC
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

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_create_raw_data_access]
const datapolicy = require('@google-cloud/bigquery-datapolicies');
const {DataPolicyServiceClient} = datapolicy.v2;
const protos = datapolicy.protos.google.cloud.bigquery.datapolicies.v2;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Create a raw data access policy.
 * Creates a data policy with type RAW_DATA_ACCESS_POLICY. This policy type
 * is used to grant raw data access to specific principals for columns that
 * are otherwise protected by security policies.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The geographic location of the data policy (for example, 'us').
 * @param {string} dataPolicyId The user-assigned ID for the data policy.
 */
async function createRawDataAccessPolicy(projectId, location, dataPolicyId) {
  const parent = `projects/${projectId}/locations/${location}`;

  const dataPolicy = {
    dataPolicyType: protos.DataPolicy.DataPolicyType.RAW_DATA_ACCESS_POLICY,
  };

  const request = {
    parent,
    dataPolicyId,
    dataPolicy,
  };

  try {
    const [response] = await client.createDataPolicy(request);
    console.log(
      `Successfully created raw data access policy: ${response.name}`,
    );
    console.log(`Data Policy ID: ${response.dataPolicyId}`);
    console.log(`Data Policy Type: ${response.dataPolicyType}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Error: Data policy '${dataPolicyId}' already exists.`);
    } else {
      console.error('An API error occurred:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_create_raw_data_access]

module.exports = {
  createRawDataAccessPolicy,
};
