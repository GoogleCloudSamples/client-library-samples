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

// [START servicemanagement_v1_servicemanager_servicerollout_get]
'use strict';

const {ServiceManagerClient} = require('@google-cloud/service-management');
const {status} = require('@grpc/grpc-js');

const client = new ServiceManagerClient();

/**
 * Use the getServiceRollout method
 *
 * @param {string} rolloutId - The ID of the rollout resource (for example, '2016-02-16r1').
 * @param {string} serviceName - The name of the service (for example, 'example.googleapis.com').
 */
async function getServiceRollout(rolloutId, serviceName) {
  try {
    const request = {
      serviceName,
      rolloutId,
    };

    const [rollout] = await client.getServiceRollout(request);

    console.log(`Rollout ID: ${rollout.rolloutId}`);
    console.log(`Status: ${rollout.status}`);
    return rollout;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Rollout not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getServiceRollout };
// [END servicemanagement_v1_servicemanager_servicerollout_get]
