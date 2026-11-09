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

// [START saasservicemgmt_v1beta1_saasrollouts_rollouts_list]
'use strict';

const {SaasRolloutsClient} = require('@google-cloud/saasservicemgmt');
const {status} = require('@grpc/grpc-js');

const client = new SaasRolloutsClient();

/**
 * Lists SaaS rollouts in a specified project and location.
 */
async function listRollouts() {
  try {
    const projectId = await client.getProjectId();
    const location = 'global';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    // Retrieve the list of rollouts matching the parent resource path
    const [rollouts] = await client.listRollouts(request);

    console.log(`Retrieved ${rollouts.length} rollout(s).`);
    for (const rollout of rollouts) {
      console.log(`Rollout: ${rollout.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication failed: ${err.message}`);
    } else {
      console.error(`API execution error: ${err.message}`);
    }
  }
}

module.exports = { listRollouts };
// [END saasservicemgmt_v1beta1_saasrollouts_rollouts_list]
