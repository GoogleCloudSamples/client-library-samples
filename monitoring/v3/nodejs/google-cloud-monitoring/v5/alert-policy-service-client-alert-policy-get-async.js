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

// [START monitoring_v3_alertpolicyservice_alertpolicy_get_async]
const {AlertPolicyServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new AlertPolicyServiceClient();

/**
 * Retrieves a specific alerting policy by its ID.
 *
 * @param {string} projectId The Google Cloud Project ID. (For example, 'example-project-id')
 * @param {string} alertPolicyId The ID of the alerting policy to retrieve. (for example, 'your-alert-policy-123')
 */
async function getAlertPolicy(
  projectId,
  alertPolicyId = 'your-alert-policy-123',
) {
  const name = client.projectAlertPolicyPath(projectId, alertPolicyId);

  const request = {
    name,
  };

  try {
    const [alertPolicy] = await client.getAlertPolicy(request);
    console.log(alertPolicy.name);
    console.log(`	Display Name: ${alertPolicy.displayName}`);
    console.log(`	Enabled: ${alertPolicy.enabled?.value}`);
    if (alertPolicy.documentation && alertPolicy.documentation.content) {
      console.log(`	Documentation: ${alertPolicy.documentation.content}`);
    }
    console.log(`	Number of conditions: ${alertPolicy.conditions?.length || 0}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Alert policy '${alertPolicyId}' not found for project '${projectId}'.`,
      );
      console.error(
        'Make sure the alert policy ID and project ID are correct.',
      );
    } else {
      console.error('Error getting alert policy:', err.message);
    }
  }
}
// [END monitoring_v3_alertpolicyservice_alertpolicy_get_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getAlertPolicy(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Alert Policy ID like '1234567890'

  Usage:

   node alert-policy-service-client-alert-policy-get-async.js example-project-168 1234567890`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {getAlertPolicy};
