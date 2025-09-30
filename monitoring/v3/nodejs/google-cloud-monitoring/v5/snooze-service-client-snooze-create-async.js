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

// [START monitoring_v3_snoozeservice_snooze_create_async]
const {SnoozeServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new SnoozeServiceClient();

/**
 * Creates a new Snooze to temporarily prevent an alert policy from generating alerts.
 *
 * A Snooze applies for a specific time interval and matches criteria like alert policy names.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 */
async function createSnooze(projectId, alertPolicyId = 'your-alert-policy-id') {
  const parent = `projects/${projectId}`;

  const now = new Date();
  const startTimeSeconds = Math.floor(now.getTime() / 1000);
  const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
  const endTimeSeconds = Math.floor(endTime.getTime() / 1000);

  const snooze = {
    displayName: 'Temporary Snooze for Example Alert Policy',
    interval: {
      startTime: {
        seconds: startTimeSeconds,
      },
      endTime: {
        seconds: endTimeSeconds,
      },
    },

    criteria: {
      policies: [`projects/${projectId}/alertPolicies/${alertPolicyId}`],
    },
  };

  const request = {
    parent,
    snooze,
  };

  try {
    const [response] = await client.createSnooze(request);
    console.log(`Successfully created snooze: ${response.name}`);
    if (response.interval.startTime) {
      const startTime = new Date(
        response.interval.startTime.seconds * 1000 +
          response.interval.startTime.nanos / 1000000,
      );
      console.log(`	Active from: ${startTime}`);
    }
    if (response.interval.endTime) {
      const endTime = new Date(
        response.interval.endTime.seconds * 1000 +
          response.interval.endTime.nanos / 1000000,
      );
      console.log(`	Active until: ${endTime}`);
    }
    console.log(`	Display Name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified project '${projectId}' or alert policy does not exist. ` +
          "Make sure the project ID is correct and the alert policy ID in 'criteria.policies' is valid.",
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(
        'Error: Invalid argument provided. Check the snooze configuration, ' +
          'especially the alert policy name and time intervals. ' +
          `Detail: ${err.message}`,
      );
    } else {
      console.error('Error creating snooze:', err.message);
    }
  }
}
// [END monitoring_v3_snoozeservice_snooze_create_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await createSnooze(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      'Usage: node snooze-service-client-snooze-create-async.js <YOUR_PROJECT_ID> <YOUR_ALERT_POLICY_ID>',
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {createSnooze};
