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

// [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create_async]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2beta1;
const {status} = require('@grpc/grpc-js');

const dataPolicyServiceClient = new DataPolicyServiceClient();
/**
 * Creates a new BigQuery Data Policy. This sample demonstrates creating a
 * data masking policy with a SHA256 masking expression and assigning a grantee.
 *
 * A Data Policy defines how sensitive data in BigQuery tables should be handled,
 * such as through data masking or fine-grained access control.
 *
 * @param {string} projectId The Google Cloud project ID. Example: 'my-project-id'
 * @param {string} location The Google Cloud location of the data policy (e.g., 'us'). Example: 'us'
 * @param {string} dataPolicyId A unique ID for the data policy within the project and location. Example: 'my-data-policy-id'
 */
async function createDataPolicy(projectId, location = 'us', dataPolicyId) {
  const parent = `projects/${projectId}/locations/${location}`;

  const dataPolicy = {
    dataPolicyType: 'DATA_MASKING_POLICY',
    dataMaskingPolicy: {
      predefinedExpression: 'SHA256',
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
    console.log(`  Data Policy ID: ${response.dataPolicyId}`);
    console.log(`  Data Policy Type: ${response.dataPolicyType}`);
    if (response.dataMaskingPolicy?.predefinedExpression) {
      console.log(
        `  Data Masking Expression: ${response.dataMaskingPolicy.predefinedExpression}`,
      );
    }
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Data policy '${dataPolicyId}' already exists in project '${projectId}' and location '${location}'.`,
      );
    } else {
      console.error('Error creating data policy:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Expected at least 3 arguments, got ${args.length}.`);
  }
  await createDataPolicy(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify at least three arguments:
 - Google Cloud Project ID like 'example-project-id'
 - Google Cloud Location like 'us'
 - Data Policy ID like 'example-data-policy-id'
Usage:
 node data-policy-service-client-data-policy-create-async.js example-project-id us example-data-policy-id
`);

  });
  main(process.argv.slice(2));
}

module.exports = {
  createDataPolicy,
};
