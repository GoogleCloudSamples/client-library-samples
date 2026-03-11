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

// [START bigquerydatapolicy_v2_datapolicyservice_grantees_add]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Add grantees to a data policy.
 * Adds IAM principals (grantees) to an existing data policy. These principals
 * are granted fine-grained access to the data governed by the policy.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The geographic location of the data policy (for example, 'us').
 * @param {string} dataPolicyId The ID of the data policy to which grantees will be added.
 * @param {string[]} grantees A list of IAM principals to be added (for example, ['user:example@gmail.com']).
 */
async function addGrantees(projectId, location, dataPolicyId, grantees) {
  const dataPolicyName = client.dataPolicyPath(
    projectId,
    location,
    dataPolicyId,
  );

  // Ensure grantees is an array (helper for CLI runner)
  const granteesArray = Array.isArray(grantees) ? grantees : [grantees];

  const request = {
    dataPolicy: dataPolicyName,
    grantees: granteesArray,
  };

  try {
    const [response] = await client.addGrantees(request);
    console.log(`Successfully added grantees to data policy: ${response.name}`);
    console.log(`Updated Grantees List: ${response.grantees.join(', ')}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Error: Data policy '${dataPolicyName}' not found.`);
    } else {
      console.error('An API error occurred:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_grantees_add]

module.exports = {
  addGrantees,
};
