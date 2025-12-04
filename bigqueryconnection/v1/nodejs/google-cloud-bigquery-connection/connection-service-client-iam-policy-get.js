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

// [START bigqueryconnection_v1_connectionservice_iampolicy_get]
// [START bigqueryconnection_connectionservice_iampolicy_get]
const {ConnectionServiceClient} =
  require('@google-cloud/bigquery-connection').v1;
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Gets the IAM policy for a BigQuery connection.
 * @param {string} projectId Google Cloud project ID (e.g., 'example-project-id').
 * @param {string} location The location of the connection (e.g., 'us').
 * @param {string} connectionId Your connection ID (e.g., 'my-connection').
 */
async function getIamPolicy(projectId, location, connectionId) {

  const resource = client.connectionPath(projectId, location, connectionId);

  const request = {
    resource,
  };

  try {

    const [policy] = await client.getIamPolicy(request);

    console.log(
      `Successfully retrieved IAM policy for connection: ${connectionId}`,
    );

    if (policy.bindings && policy.bindings.length > 0) {
      console.log('Bindings:');
      policy.bindings.forEach(binding => {
        console.log(`  Role: ${binding.role}`);
        console.log('  Members:');
        binding.members.forEach(member => {
          console.log(`    - ${member}`);
        });
      });
    } else {
      console.log('No policy bindings found.');
    }
  } catch (err) {

    if (err.code === status.NOT_FOUND) {
      console.log(
        `Connection '${connectionId}' not found in project '${projectId}' at location '${location}'.`,
      );
    } else {
      console.error('An error occurred while getting the IAM policy:', err);
    }
  }
}
// [END bigqueryconnection_connectionservice_iampolicy_get]
// [END bigqueryconnection_v1_connectionservice_iampolicy_get]

module.exports = {
  getIamPolicy,
};
