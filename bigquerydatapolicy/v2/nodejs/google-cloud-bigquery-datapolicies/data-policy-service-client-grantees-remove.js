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

// [START bigquerydatapolicy_v2_datapolicyservice_grantees_remove]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Remove grantees from a data policy.
 * Removes IAM principals (grantees) from an existing data policy, revoking
 * their fine-grained access to the governed data.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The geographic location of the data policy (for example, 'us').
 * @param {string} dataPolicyId The ID of the data policy from which grantees will be removed.
 * @param {string[]} grantees A list of IAM principals to be removed (for example, ['user:example@gmail.com']).
 */
async function removeGrantees(projectId, location, dataPolicyId, grantees) {
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
    const [response] = await client.removeGrantees(request);
    console.log(
      `Successfully removed grantees from data policy: ${response.name}`,
    );
    console.log(`Updated Grantees List: ${response.grantees.join(', ')}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Error: Data policy '${dataPolicyName}' not found.`);
    } else {
      console.error('An API error occurred:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_grantees_remove]

module.exports = {
  removeGrantees,
};
