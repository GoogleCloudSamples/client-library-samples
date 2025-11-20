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

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_create]
const datapolicy = require('@google-cloud/bigquery-datapolicies');
const {DataPolicyServiceClient} = datapolicy.v2;
const protos = datapolicy.protos.google.cloud.bigquery.datapolicies.v2;
const {status} = require('@grpc/grpc-js');

const dataPolicyServiceClient = new DataPolicyServiceClient();

/**
 * Creates a new data policy under a project with the given data_policy_id
 * and data policy type. This sample creates a data masking policy.
 *
 * @param {string} projectId Your Google Cloud project ID.
 * @param {string} location The Google Cloud location (e.g., 'us').
 * @param {string} dataPolicyId The user-assigned ID of the data policy.
 */
async function createDataPolicy(projectId, location, dataPolicyId) {
  const parent = `projects/${projectId}/locations/${location}`;

  const dataPolicy = {
    dataPolicyType: protos.DataPolicy.DataPolicyType.DATA_MASKING_POLICY,
    dataMaskingPolicy: {
      predefinedExpression:
        protos.DataMaskingPolicy.PredefinedExpression.SHA256,
    },
  };

  const request = {
    parent: parent,
    dataPolicyId: dataPolicyId,
    dataPolicy: dataPolicy,
  };

  try {
    const [response] = await dataPolicyServiceClient.createDataPolicy(request);
    console.log(`Successfully created data policy: ${response.name}`);
    console.log(`Data policy ID: ${response.dataPolicyId}`);
    console.log(`Data policy type: ${response.dataPolicyType}`);
    if (response.dataMaskingPolicy) {
      console.log(
        `Data masking expression: ${response.dataMaskingPolicy.predefinedExpression}`,
      );
    }
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Data policy '${dataPolicyId}' already exists in location '${location}' of project '${projectId}'.`,
      );
      console.log(
        'Consider updating the existing data policy or using a different dataPolicyId.',
      );
    } else {
      console.error('Error creating data policy:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_create]

module.exports = {
  createDataPolicy,
};
