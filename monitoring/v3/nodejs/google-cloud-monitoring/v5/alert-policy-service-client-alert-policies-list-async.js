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

// [START monitoring_v3_alertpolicyservice_alertpolicies_list_async]
const {AlertPolicyServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new AlertPolicyServiceClient();

/**
 * Lists all alerting policies for a given Google Cloud project.
 *
 * @param {string} projectId The Google Cloud Project ID.
 */
async function listAlertPolicies(projectId) {
  const request = {
    name: `projects/${projectId}`,
  };

  try {
    const [alertPolicies] = await client.listAlertPolicies(request);

    if (alertPolicies.length === 0) {
      console.log(`No alert policies found for project ${projectId}.`);
      return;
    }

    console.log(`Alert Policies for project ${projectId}:`);
    for (const policy of alertPolicies) {
      console.log(policy.name);
      if (policy.conditions && policy.conditions.length > 0) {
        console.log(`	Conditions: ${policy.conditions.length}`);
      }
      console.log(`	Display Name: ${policy.displayName}`);
      if (policy.documentation && policy.documentation.content) {
        console.log(
          `	Documentation: ${policy.documentation.content.substring(0, 50)}...`,
        );
      }
      console.log(`	Enabled: ${policy.enabled ? 'Yes' : 'No'}`);
      console.log('---');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' not found or you do not have permission to access it.`,
      );
      console.error(
        'Make sure the project ID is correct and the service account has the Monitoring Viewer role (roles/monitoring.viewer).',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Error: Permission denied for project '${projectId}'.`);
      console.error(
        'Make sure the service account has the Monitoring Viewer role (roles/monitoring.viewer).',
      );
    } else {
      console.error('Error listing alert policies:', err.message);
    }
  }
}
// [END monitoring_v3_alertpolicyservice_alertpolicies_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await listAlertPolicies(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, provide the Google Cloud Project ID:

    node alert-policy-service-client-alert-policies-list-async.js <YOUR_PROJECT_ID>`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {listAlertPolicies};
