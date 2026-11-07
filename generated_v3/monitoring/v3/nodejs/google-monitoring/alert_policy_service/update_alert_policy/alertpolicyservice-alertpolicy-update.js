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

// [START monitoring_v3_alertpolicyservice_alertpolicy_update]
'use strict';

const {AlertPolicyServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new AlertPolicyServiceClient();

/**
 * Use the updateAlertPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} alertPolicyId - The server-generated ID of the alert policy.
 */
async function updateAlertPolicy(projectId, alertPolicyId) {
  try {
    const alertPolicy = {
      name: client.projectAlertPolicyPath(projectId, alertPolicyId),
      displayName: 'Updated Alert Policy',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      alertPolicy,
      updateMask,
    };

    const [response] = await client.updateAlertPolicy(request);
    console.log(`Updated alert policy: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Alert policy ${alertPolicyId} not found in project ${projectId}.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for alert policy update: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when updating alert policy: ${err.message}`);
    } else {
      console.error(`Error updating alert policy: ${err.message || err}`);
    }
    throw err;
  }
}

module.exports = { updateAlertPolicy };
// [END monitoring_v3_alertpolicyservice_alertpolicy_update]
