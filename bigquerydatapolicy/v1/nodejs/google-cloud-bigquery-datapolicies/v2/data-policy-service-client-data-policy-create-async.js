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

// [START bigquerydatapolicy_v1_datapolicyservice_datapolicy_create_async]
const {DataPolicyServiceClient} = require('@google-cloud/bigquery-datapolicies').v1;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Creates a new data policy under a project with the given ID, policy tag, and data policy type.
 *
 * A data policy defines how sensitive data is handled in BigQuery. This example creates a
 * data masking policy that replaces data with SHA-256 hash for a specified policy tag.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-id')
 * @param {string} location The Google Cloud location of the data policy (e.g., 'us-central1')
 * @param {string} dataPolicyId The user-assigned ID for the data policy, unique within the project (e.g., 'my-data-policy-123')
 * @param {string} policyTag The full resource name of the policy tag to associate with this data policy.
 *                           Format: `projects/{project_number}/locations/{location_id}/taxonomies/{taxonomy_id}/policyTags/{policyTag_id}`
 *                           (e.g., 'projects/1234567890/locations/us-central1/taxonomies/12345/policyTags/67890')
 */
async function createDataPolicy(
  projectId,
  location,
  dataPolicyId,
  policyTag
) {
  // Arrange: Prepare the request parameters.
  const parent = `projects/${projectId}/locations/${location}`;

  const dataPolicy = {
    dataPolicyId: dataPolicyId,
    policyTag: policyTag,
    // Set the data policy type to DATA_MASKING_POLICY.
    dataPolicyType: DataPolicyServiceClient.DataPolicy.DataPolicyType.DATA_MASKING_POLICY,
    // Configure the data masking policy to use SHA256 hashing.
    dataMaskingPolicy: {
      predefinedExpression: DataPolicyServiceClient.DataPolicy.DataMaskingPolicy.PredefinedExpression.SHA256,
    },
  };

  const request = {
    parent: parent,
    dataPolicy: dataPolicy,
  };

  try {
    // Act: Execute the API call.
    const [response] = await client.createDataPolicy(request);

    // Assert: Print the successful outcome.
    console.log(`Successfully created data policy: ${response.name}`);
    console.log(`  Data Policy ID: ${response.dataPolicyId}`);
    console.log(`  Policy Tag: ${response.policyTag}`);
    console.log(`  Data Policy Type: ${DataPolicyServiceClient.DataPolicy.DataPolicyType[response.dataPolicyType]}`);
    if (response.dataMaskingPolicy) {
      console.log(`  Masking Expression: ${DataPolicyServiceClient.DataPolicy.DataMaskingPolicy.PredefinedExpression[response.dataMaskingPolicy.predefinedExpression]}`);
    }
  } catch (err) {
    // Handle common API errors.
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Data policy '${dataPolicyId}' already exists in project '${projectId}' at location '${location}'.`
      );
      console.log('Consider updating the existing data policy or choosing a different dataPolicyId.');
    } else {
      // For other unexpected errors, log the full error for debugging.
      // In a production environment, you might want to implement more specific error handling
      // based on the error type or message.
      console.error('Error creating data policy:', err.message);
      throw err; // Re-throw to be caught by the main function's error handler.
    }
  }
}
// [END bigquerydatapolicy_v1_datapolicyservice_datapolicy_create_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`Expected 4 arguments, got ${args.length}.`);
  }
  await createDataPolicy(args[0], args[1], args[2], args[3]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify four arguments:
 - Google Cloud Project like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Data Policy ID like 'my-data-policy-123'
 - Policy Tag resource name like 'projects/1234567890/locations/us-central1/taxonomies/12345/policyTags/67890'
Usage:
 node data-policy-service-client-data-policy-create-async.js my-project-id us-central1 my-data-policy-123 projects/1234567890/locations/us-central1/taxonomies/12345/policyTags/67890
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createDataPolicy,
};
