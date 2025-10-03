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

// Imports for the command-line runner
const process = require('process');

// [START bigquerydatapolicy_v1_datapolicyservice_datapolicy_update_async]
const {DataPolicyServiceClient} = require('@google-cloud/bigquery-datapolicies').v1;
const {status} = require('@grpc/grpc-js');

// Instantiate the client
const client = new DataPolicyServiceClient();

/**
 * Updates an existing data policy in BigQuery Data Policies. This sample demonstrates
 * how to change the data masking policy for an existing data policy.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} locationId The ID of the location where the data policy exists (e.g., 'us').
 * @param {string} dataPolicyId The ID of the data policy to update. This data policy must already exist.
 * @param {string} policyTag The full resource name of the policy tag to associate with the data policy.
 *                           Example: `projects/my-project/locations/us/taxonomies/123/policyTags/456`
 *                           This policy tag must exist and be associated with the data policy.
 */
async function updateDataPolicy(
  projectId,
  locationId,
  dataPolicyId,
  policyTag
) {
  // Construct the full resource name of the data policy to update.
  // This name identifies the specific data policy to be modified.
  const name = client.dataPolicyPath(projectId, locationId, dataPolicyId);

  // Define the updated data policy object. The 'name' field is crucial for identification.
  // This example updates the data masking policy to use 'ALWAYS_NULL' and potentially the policy tag.
  const dataPolicy = {
    name: name,
    // Ensure dataPolicyType matches the existing type or is updated appropriately.
    // For this example, we assume it's an existing DATA_MASKING_POLICY.
    dataPolicyType: 'DATA_MASKING_POLICY',
    policyTag: policyTag, // Update the policy tag associated with this data policy
    dataMaskingPolicy: {
      predefinedExpression: 'ALWAYS_NULL', // Set the new predefined masking expression
    },
  };

  // Define the update mask to specify which fields of the `dataPolicy` object
  // in the request should be applied to the existing resource. This is important
  // to avoid unintended changes to other fields not specified in the mask.
  const updateMask = {
    paths: ['dataMaskingPolicy.predefinedExpression', 'policyTag'],
  };

  const request = {
    dataPolicy: dataPolicy,
    updateMask: updateMask,
  };

  try {
    const [response] = await client.updateDataPolicy(request);
    console.log('Successfully updated data policy:');
    console.log(`Name: ${response.name}`);
    console.log(`Type: ${response.dataPolicyType}`);
    if (response.policyTag) {
      console.log(`Policy Tag: ${response.policyTag}`);
    }
    if (response.dataMaskingPolicy) {
      console.log(`Data Masking Predefined Expression: ${response.dataMaskingPolicy.predefinedExpression}`);
    }
  } catch (err) {
    // Handle common API errors. NOT_FOUND indicates the resource doesn't exist,
    // while INVALID_ARGUMENT suggests issues with the request parameters.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Data policy '${dataPolicyId}' not found in project '${projectId}', location '${locationId}'. ` +
          `Please ensure the data policy exists and the name is correct.`
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(
        `Error: Invalid argument provided for updating data policy '${dataPolicyId}'. ` +
          `Details: ${err.message}. Please check the request parameters and ensure they are valid.`
      );
    } else {
      // Log any other unexpected errors.
      console.error(`Error updating data policy: ${err.message}`);
    }
  }
}
// [END bigquerydatapolicy_v1_datapolicyservice_datapolicy_update_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`Expected 4 arguments, got ${args.length}.`);
  }
  await updateDataPolicy(args[0], args[1], args[2], args[3]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify four arguments:
 - Google Cloud Project like 'example-project-id'
 - Google Cloud Location like 'us'
 - Data Policy ID like 'my-data-policy-123'
 - Policy Tag resource name like 'projects/my-project-id/locations/us/taxonomies/my-taxonomy-id/policyTags/my-policy-tag-id'
Usage:
 node data-policy-service-client-data-policy-update-async.js example-project-id us my-data-policy-123 projects/my-project-id/locations/us/taxonomies/my-taxonomy-id/policyTags/my-policy-tag-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  updateDataPolicy,
};
