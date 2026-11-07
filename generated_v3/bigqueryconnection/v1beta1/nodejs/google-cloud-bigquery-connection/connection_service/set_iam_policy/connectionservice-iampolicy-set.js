// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START bigqueryconnection_v1beta1_connectionservice_set_iam_policy]
'use strict';

const {ConnectionServiceClient} = require('@google-cloud/bigquery-connection');
const {status} = require('@grpc/grpc-js');

const client = new ConnectionServiceClient();

/**
 * Sets the IAM policy for a BigQuery connection.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID of the connection (for example, 'us-central1').
 * @param {string} connectionId - The connection ID.
 */
async function setIamPolicy(projectId, locationId, connectionId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/connections/${connectionId}`;

    // Retrieve the existing IAM policy to preserve existing bindings and obtain the current etag
    const [currentPolicy] = await client.getIamPolicy({resource});

    // Construct the updated policy with a new role binding while retaining the etag for concurrency control
    const policy = {
      etag: currentPolicy.etag,
      bindings: [
        ...(currentPolicy.bindings || []),
        {
          role: 'roles/bigquery.connectionUser',
          members: [
            `serviceAccount:example-service-account@${projectId}.iam.gserviceaccount.com`,
          ],
        },
      ],
    };

    const [updatedPolicy] = await client.setIamPolicy({
      resource,
      policy,
    });

    console.log(`Successfully updated IAM policy for ${resource}`);
    console.log(`New policy version: ${updatedPolicy.version}`);
    console.log(`New policy etag: ${updatedPolicy.etag ? updatedPolicy.etag.toString('base64') : 'none'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection resource not found: ${err.message}`);
    } else if (err.code === status.ABORTED) {
      console.error(`Concurrency conflict encountered while updating policy: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing IAM policy: ${err.message}`);
    } else {
      console.error(`Failed to set IAM policy: ${err.message}`);
    }
  }
}

module.exports = { setIamPolicy };
// [END bigqueryconnection_v1beta1_connectionservice_set_iam_policy]
