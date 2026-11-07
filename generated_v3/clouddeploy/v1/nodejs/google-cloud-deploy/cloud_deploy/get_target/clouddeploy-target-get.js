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

// [START clouddeploy_v1_clouddeploy_target_get]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Retrieves the details of a Cloud Deploy target.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} targetId - The ID of the Cloud Deploy target to retrieve.
 * @param {string} locationId - The Google Cloud region of the Target (for example, 'us-central1').
 */
async function getTarget(projectId, targetId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/targets/${targetId}`;

    const [target] = await client.getTarget({name});

    console.log(`Target name: ${target.name}`);
    console.log(`Target create time: ${target.createTime ? new Date(target.createTime.seconds * 1000).toISOString() : 'N/A'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target not found: projects/${projectId}/locations/${locationId}/targets/${targetId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing target: projects/${projectId}/locations/${locationId}/targets/${targetId}`);
    } else {
      console.error(`API error retrieving target: ${err.message}`);
    }
  }
}

module.exports = { getTarget };
// [END clouddeploy_v1_clouddeploy_target_get]
