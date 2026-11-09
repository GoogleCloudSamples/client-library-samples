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

// [START monitoring_v3_alertpolicyservice_alertpolicy_delete]
'use strict';

const {AlertPolicyServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new AlertPolicyServiceClient();

/**
 * Use the deleteAlertPolicy method
 *
 * @param {string} alertPolicyId - The server-generated ID of the alert policy to delete.
 * @param {string} projectId - The Google Cloud project ID containing the alert policy.
 */
async function deleteAlertPolicy(alertPolicyId, projectId) {
  const name = `projects/${projectId}/alertPolicies/${alertPolicyId}`;

  try {
    const request = {
      name,
    };

    // Alert policy deletions within a single project must be serialized
    await client.deleteAlertPolicy(request);
    console.log(`Deleted alert policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Alert policy not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while deleting alert policy: ${name}`);
    } else {
      console.error(`Error deleting alert policy ${name}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteAlertPolicy };
// [END monitoring_v3_alertpolicyservice_alertpolicy_delete]
