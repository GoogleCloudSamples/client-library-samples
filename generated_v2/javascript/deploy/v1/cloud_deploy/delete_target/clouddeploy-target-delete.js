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

// [START clouddeploy_v1_clouddeploy_target_delete]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Use the deleteTarget method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} targetId - The ID of the existing Target to delete.
 * @param {string} locationId - The Google Cloud region of the target (for example, 'us-central1').
 */
async function deleteTarget(projectId, targetId, locationId) {
  const name = `projects/${projectId}/locations/${locationId}/targets/${targetId}`;

  try {
    const [operation] = await client.deleteTarget({
      name: name,
    });

    // Wait for the long-running operation to complete
    await operation.promise();
    console.log(`Target deleted successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed when deleting target: ${err.message}`);
    } else {
      console.error(`Failed to delete target: ${err.message}`);
    }
  }
}

module.exports = { deleteTarget };
// [END clouddeploy_v1_clouddeploy_target_delete]
