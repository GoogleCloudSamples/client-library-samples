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

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_update]
const datapolicy = require('@google-cloud/bigquery-datapolicies');
const {DataPolicyServiceClient} = datapolicy.v2;
const protos = datapolicy.protos.google.cloud.bigquery.datapolicies.v2;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Updates the data masking configuration of an existing data policy.
 * This example demonstrates how to use a FieldMask to selectively update the
 * `data_masking_policy` (for example, changing the masking expression from
 * ALWAYS_NULL to SHA256) without affecting other fields or recreating the policy.
 *
 * @param {string} projectId The Google Cloud project ID (For example, 'example-project-id').
 * @param {string} location The location of the data policy (For example, 'us').
 * @param {string} dataPolicyId The ID of the data policy to update (For example, 'example-data-policy-id').
 */
async function updateDataPolicy(projectId, location, dataPolicyId) {
  const resourceName = client.dataPolicyPath(projectId, location, dataPolicyId);

  const getRequest = {
    name: resourceName,
  };

  try {
    // To prevent race conditions, use the policy's etag in the update.
    const [currentDataPolicy] = await client.getDataPolicy(getRequest);
    const currentETag = currentDataPolicy.etag;

    // This example transitions a masking rule from ALWAYS_NULL to SHA256.
    const dataPolicy = {
      name: resourceName,
      etag: currentETag,
      dataMaskingPolicy: {
        predefinedExpression:
          protos.DataMaskingPolicy.PredefinedExpression.SHA256,
      },
    };

    // Use a field mask to selectively update only the data masking policy.
    const updateMask = {
      paths: ['data_masking_policy'],
    };

    const request = {
      dataPolicy,
      updateMask,
    };

    const [response] = await client.updateDataPolicy(request);
    console.log(`Successfully updated data policy: ${response.name}`);
    console.log(
      `New masking expression: ${response.dataMaskingPolicy.predefinedExpression}`
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Data policy '${resourceName}' not found. ` +
          'Make sure the data policy exists and the project, location, and data policy ID are correct.'
      );
    } else {
      console.error('Error updating data policy:', err.message, err);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_update]

module.exports = {
  updateDataPolicy,
};
