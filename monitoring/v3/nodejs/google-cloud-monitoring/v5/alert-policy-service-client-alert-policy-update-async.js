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

// [START monitoring_v3_alertpolicyservice_alertpolicy_update_async]
const {AlertPolicyServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new AlertPolicyServiceClient();

/**
 * Updates an existing alerting policy.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} alertPolicyId The ID of the alert policy to update (for example, '1234567890')
 */
async function updateAlertPolicy(projectId, alertPolicyId = '1234567890') {
  const name = `projects/${projectId}/alertPolicies/${alertPolicyId}`;

  const updatedAlertPolicy = {
    name: name,
    displayName: 'Updated Alert Policy for CPU Utilization',
    documentation: {
      content: 'This policy monitors CPU utilization and was recently updated.',
      mimeType: 'text/markdown',
    },
    enabled: {value: true},
  };

  const updateMask = {
    paths: [
      'display_name',
      'documentation.content',
      'documentation.mime_type',
      'enabled',
    ],
  };

  const request = {
    alertPolicy: updatedAlertPolicy,
    updateMask,
  };

  try {
    const [response] = await client.updateAlertPolicy(request);
    console.log(response.name);
    console.log(`  Display Name: ${response.displayName}`);
    console.log(`  Documentation: ${response.documentation?.content}`);
    console.log(`  Enabled: ${response.enabled.value}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Alert policy ${alertPolicyId} not found in project ${projectId}.`,
      );
      console.error(
        'Make sure the alert policy ID and project ID are correct.',
      );
    } else {
      console.error('Failed to update alert policy:', err.message);
    }
  }
}
// [END monitoring_v3_alertpolicyservice_alertpolicy_update_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await updateAlertPolicy(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Alert Policy ID like '1234567890'

  Usage:

   node alert-policy-service-client-alert-policy-update-async.js example-project-168 1234567890`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {updateAlertPolicy};
