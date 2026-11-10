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

// [START bigquerydatapolicy_v1beta1_datapolicyservice_datapolicy_create]
'use strict';

const {DataPolicyServiceClient} = require('@google-cloud/bigquery-datapolicies');
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Creates a BigQuery data policy using the DataPolicyService client.
 *
 * @param {string} locationId - The Google Cloud region where the data policy is created (for example, 'us-central1').
 * @param {string} dataPolicyId - The identifier of the data policy to create.
 * @param {string} projectId - The Google Cloud project ID where the data policy is created.
 */
async function createDataPolicy(locationId, dataPolicyId, projectId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const dataMaskingPolicy = {
      predefinedExpression: 'SHA256',
    };
    const dataPolicy = {
      dataPolicyId,
      dataPolicyType: 'DATA_MASKING_POLICY',
      policyTag: `projects/${projectId}/locations/${locationId}/taxonomies/example-taxonomy-id/policyTags/example-policy-tag-id`,
      dataMaskingPolicy,
    };

    const request = {
      parent,
      dataPolicy,
    };

    const [response] = await client.createDataPolicy(request);
    console.log(`Created data policy: ${response.name}`);
    console.log(`Data policy type: ${response.dataPolicyType}`);
    console.log(`Policy tag: ${response.policyTag}`);
    if (response.dataMaskingPolicy) {
      console.log(
        `Predefined expression: ${response.dataMaskingPolicy.predefinedExpression}`
      );
    }
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Data policy already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied creating data policy: ${err.message}`);
    } else {
      console.error(`Failed to create data policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {createDataPolicy};
// [END bigquerydatapolicy_v1beta1_datapolicyservice_datapolicy_create]
