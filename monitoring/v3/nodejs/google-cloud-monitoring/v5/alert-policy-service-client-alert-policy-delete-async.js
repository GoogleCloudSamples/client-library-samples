// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const process = require('process');

// [START monitoring_v3_alertpolicyservice_alertpolicy_delete_async]
const {AlertPolicyServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new AlertPolicyServiceClient();

/**
 * Deletes an alerting policy.
 *
 * @param {string} projectId Your Google Cloud Project ID (For example, 'your-project-123')
 * @param {string} alertPolicyId The ID of the alert policy to delete (for example, '1234567890')
 */
async function deleteAlertPolicy(projectId, alertPolicyId = '1234567890') {
  const name = client.projectAlertPolicyPath(projectId, alertPolicyId);

  const request = {
    name,
  };

  try {
    await client.deleteAlertPolicy(request);
    console.log(`Alert policy ${alertPolicyId} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Alert policy ${alertPolicyId} not found under project ${projectId}.`,
      );
      console.log(
        'Make sure the alert policy ID is correct and exists in the specified project.',
      );
    } else {
      console.error('Error deleting alert policy:', err.message);
    }
  }
}
// [END monitoring_v3_alertpolicyservice_alertpolicy_delete_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await deleteAlertPolicy(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Alert Policy ID like '1234567890'

  Usage:

   node alert-policy-service-client-alert-policy-delete-async.js example-project-168 1234567890`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {deleteAlertPolicy};
