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

// [START servicemanagement_v1_servicemanager_servicerollouts_list]
'use strict';

const {ServiceManagerClient} = require('@google-cloud/service-management');
const {status} = require('@grpc/grpc-js');

const client = new ServiceManagerClient();

/**
 * Lists the rollouts for a managed service.
 */
async function listServiceRollouts() {
  try {
    const filter = 'status=SUCCESS';
    const serviceName = 'endpoints.examples.cloud.google.com';

    const request = {
      serviceName,
      filter,
    };

    const [rollouts] = await client.listServiceRollouts(request);
    for (const rollout of rollouts) {
      console.log(`Rollout ID: ${rollout.rolloutId}`);
      console.log(`Status: ${rollout.status}`);
      console.log(`Created by: ${rollout.createdBy}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The requested service was not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Caller lacks permission to access the service rollouts.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Request failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listServiceRollouts };
// [END servicemanagement_v1_servicemanager_servicerollouts_list]
