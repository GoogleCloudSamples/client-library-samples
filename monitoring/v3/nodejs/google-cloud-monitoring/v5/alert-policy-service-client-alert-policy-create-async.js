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

// [START monitoring_v3_alertpolicyservice_alertpolicy_create_async]
const {AlertPolicyServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new AlertPolicyServiceClient();

/**
 * Creates a new alerting policy that triggers when a specified metric
 * exceeds a threshold for a certain duration.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} notificationChannelId The ID of an existing notification channel (for example, '1234567890')
 */
async function createAlertPolicy(
  projectId,
  notificationChannelId = '1234567890',
) {
  const formattedParent = client.projectPath(projectId);
  const notificationChannelName = client.projectNotificationChannelPath(
    projectId,
    notificationChannelId,
  );

  const alertPolicy = {
    displayName: 'My CPU Alert Policy',
    combiner: 'AND',
    conditions: [
      {
        displayName: 'CPU utilization exceeds 90%',
        conditionThreshold: {
          filter:
            'metric.type="compute.googleapis.com/instance/cpu/utilization" AND resource.type="gce_instance"',
          comparison: 'COMPARISON_GT',
          thresholdValue: 0.9,
          duration: {seconds: 300}, // 5 minutes
          aggregations: [
            {
              alignmentPeriod: {seconds: 60}, // 1 minute
              perSeriesAligner: 'ALIGN_MEAN',
              crossSeriesReducer: 'REDUCE_MEAN',
              groupByFields: ['resource.label.instance_id'],
            },
          ],
        },
      },
    ],
    notificationChannels: [notificationChannelName],
    severity: 'CRITICAL',
    enabled: {value: true},
  };

  const request = {
    name: formattedParent,
    alertPolicy,
  };

  try {
    const [newAlertPolicy] = await client.createAlertPolicy(request);
    console.log(newAlertPolicy.name);
    console.log(`	Display Name: ${newAlertPolicy.displayName}`);
    console.log(`	Enabled: ${newAlertPolicy.enabled.value}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.warn(
        `Alert policy with display name '${alertPolicy.displayName}' already exists in project '${projectId}'.`,
      );
      console.warn(
        'Consider updating the existing policy or choosing a different display name.',
      );
    } else {
      console.error('Failed to create alert policy:', err.message);
    }
  }
}
// [END monitoring_v3_alertpolicyservice_alertpolicy_create_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await createAlertPolicy(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Notification Channel ID like '123456789'

  Usage:

   node alert-policy-service-client-alert-policy-create-async.js example-project-168 123456789
  `);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {createAlertPolicy};
