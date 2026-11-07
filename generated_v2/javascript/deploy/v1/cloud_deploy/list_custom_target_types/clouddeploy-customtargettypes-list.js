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

// [START clouddeploy_v1_clouddeploy_customtargettypes_list]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Use the listCustomTargetTypes method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1') where the CustomTargetType resources are located.
 */
async function listCustomTargetTypes(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [customTargetTypes] = await client.listCustomTargetTypes({
      parent,
    });

    console.log('Custom target types:');
    for (const customTargetType of customTargetTypes) {
      console.log(`- Name: ${customTargetType.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listCustomTargetTypes };
// [END clouddeploy_v1_clouddeploy_customtargettypes_list]
