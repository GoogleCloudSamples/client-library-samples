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

// [START clouddeploy_v1_clouddeploy_customtargettype_delete]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Use the deleteCustomTargetType method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (region) ID, such as 'us-central1'.
 * @param {string} customTargetTypeId - The ID of the custom target type to delete. Must match regex '^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$'.
 */
async function deleteCustomTargetType(projectId, locationId, customTargetTypeId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/customTargetTypes/${customTargetTypeId}`;

    const [operation] = await client.deleteCustomTargetType({
      name,
    });
    await operation.promise();

    console.log(`Deleted custom target type: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Custom target type not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation failed precondition: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { deleteCustomTargetType };
// [END clouddeploy_v1_clouddeploy_customtargettype_delete]
