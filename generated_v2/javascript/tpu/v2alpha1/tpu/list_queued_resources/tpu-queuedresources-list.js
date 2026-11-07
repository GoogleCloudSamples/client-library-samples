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

// [START tpu_v2alpha1_tpu_queuedresources_list]
'use strict';

const {v2alpha1} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new v2alpha1.TpuClient();

/**
 * Lists Cloud TPU Queued Resources in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or zone (for example, us-central1-a) hosting the TPU queued resources.
 */
async function listQueuedResources(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [queuedResources] = await client.listQueuedResources(request);

    if (!queuedResources || queuedResources.length === 0) {
      console.log(`No queued resources found in ${parent}.`);
      return;
    }

    for (const resource of queuedResources) {
      console.log(`Queued resource: ${resource.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error listing queued resources: ${err.message}`);
    }
  }
}

module.exports = { listQueuedResources };
// [END tpu_v2alpha1_tpu_queuedresources_list]
