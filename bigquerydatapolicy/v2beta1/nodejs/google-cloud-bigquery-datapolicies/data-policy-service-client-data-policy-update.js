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


// [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_update]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2beta1;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Updates an existing data policy.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} locationId The ID of the location where the data policy exists (e.g., "us").
 * @param {string} dataPolicyId The ID of the data policy to update.
 */
async function updateDataPolicy(projectId, locationId, dataPolicyId) {
  const dataPolicyName = client.dataPolicyPath(
    projectId,
    locationId,
    dataPolicyId,
  );

  try {
    const getRequest = {
      name: dataPolicyName,
    };

    // Gather the existing policy, and use the policy type and etag in the update
    const [getDataPolicy] = await client.getDataPolicy(getRequest);

    const currentDataPolicyType = getDataPolicy.dataPolicyType;
    const currentETag = getDataPolicy.etag;

    const dataPolicy = {
      name: dataPolicyName,
      dataPolicyType: currentDataPolicyType,
      etag: currentETag,
      dataMaskingPolicy: {
        predefinedExpression: 'SHA256', // Example updated value
      },
    };

    const request = {
      dataPolicy: dataPolicy,
      updateMask: {
        paths: ['data_policy_type', 'data_masking_policy'],
      },
    };

    const [response] = await client.updateDataPolicy(request);
    console.log(`Successfully updated data policy: ${response.name}`);
    console.log(`Updated Data Policy Type: ${response.dataPolicyType}`);
    if (
      response.dataMaskingPolicy &&
      response.dataMaskingPolicy.predefinedExpression
    ) {
      console.log(
        `Updated Data Masking Policy: ${response.dataMaskingPolicy.predefinedExpression}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Data policy '${dataPolicyName}' not found. Ensure the data policy ID and location are correct.`,
      );
    } else {
      console.error('Error updating data policy:', err.message, err);
    }
  }
}
// [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_update]

module.exports = {
  updateDataPolicy,
};

