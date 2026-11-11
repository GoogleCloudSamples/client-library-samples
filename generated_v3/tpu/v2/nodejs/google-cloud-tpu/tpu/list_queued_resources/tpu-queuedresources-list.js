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

// [START tpu_v2_tpu_queuedresources_list]
'use strict';

const {v2} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new v2.TpuClient();

/**
 * Lists Cloud TPU queued resources in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud TPU location/zone (for example, 'us-central1-a').
 */
async function listQueuedResources(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [resources] = await client.listQueuedResources(request);

    if (resources.length === 0) {
      console.log('No queued resources found.');
      return;
    }

    for (const resource of resources) {
      console.log(`Queued Resource: ${resource.name}`);
      console.log(`State: ${resource.state?.state ?? 'STATE_UNSPECIFIED'}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listQueuedResources };
// [END tpu_v2_tpu_queuedresources_list]
