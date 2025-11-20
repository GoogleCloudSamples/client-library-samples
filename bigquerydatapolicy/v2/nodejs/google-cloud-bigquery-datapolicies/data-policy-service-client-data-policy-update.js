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
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Updates an existing data policy, specifically its data masking policy's predefined expression.
 *
 * @param {string} projectId The Google Cloud project ID (e.g., 'my-project-id').
 * @param {string} location The location of the data policy (e.g., 'us').
 * @param {string} dataPolicyId The ID of the data policy to update (e.g., 'my-data-policy-id').
 */
async function updateDataPolicy(projectId, location, dataPolicyId) {
  const resourceName = client.dataPolicyPath(projectId, location, dataPolicyId);

  const getRequest = {
    name: resourceName,
  };

  try {
    // Gather the existing policy, and use the policy type and etag in the update
    const [currentDataPolicy] = await client.getDataPolicy(getRequest);
    const currentDataPolicyType = currentDataPolicy.dataPolicyType;
    const currentETag = currentDataPolicy.etag;

    const dataPolicy = {
      name: resourceName,
      dataPolicyType: currentDataPolicyType,
      etag: currentETag,
      dataMaskingPolicy: {
        predefinedExpression: 'SHA256', // Example updated value
      },
    };

    // Define the update mask to specify which fields are being updated.
    // This is crucial for partial updates to avoid overwriting other fields.
    const updateMask = {
      paths: ['data_masking_policy.predefined_expression'],
    };

    const request = {
      dataPolicy: dataPolicy,
      updateMask: updateMask,
    };

    const [response] = await client.updateDataPolicy(request);
    console.log(`Successfully updated data policy: ${response.name}`);
    console.log(
      `New masking expression: ${response.dataMaskingPolicy.predefinedExpression}`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Data policy '${resourceName}' not found. ` +
          'Ensure the data policy exists and the project, location, and data policy ID are correct.',
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
