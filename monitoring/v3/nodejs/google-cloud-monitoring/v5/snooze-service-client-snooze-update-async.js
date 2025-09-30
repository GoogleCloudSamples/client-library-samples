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

// [START monitoring_v3_snoozeservice_snooze_update_async]
const {SnoozeServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new SnoozeServiceClient();

/**
 * Updates an existing Snooze with a new display name.
 *
 * A Snooze temporarily prevents an alert policy from generating alerts.
 * This sample demonstrates how to update a Snooze resource in Google Cloud Monitoring
 * by changing its display name.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id').
 * @param {string} snoozeId The ID of the Snooze to update (for example, 'snooze-12345').
 */
async function updateSnooze(projectId, snoozeId = 'snooze-12345') {
  const snoozeName = client.snoozePath(projectId, snoozeId);

  const newDisplayName = `My Updated Snooze - ${Date.now()}`;

  const snooze = {
    name: snoozeName,
    displayName: newDisplayName,
  };

  const updateMask = {
    paths: ['display_name'],
  };

  const request = {
    snooze,
    updateMask,
  };

  try {
    const [updatedSnooze] = await client.updateSnooze(request);
    console.log(updatedSnooze.name);
    console.log(`	Display Name: '${updatedSnooze.displayName}'`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Snooze '${snoozeName}' not found. Make sure the snooze ID and project ID are correct.`,
      );
      console.error(
        'Suggestion: Verify the snooze ID by listing snoozes or checking the Google Cloud console.',
      );
    } else {
      console.error(`Failed to update snooze '${snoozeName}': ${err.message}`);
      console.error(
        'Suggestion: Check your project ID, snooze ID, and make sure the service account has monitoring.snoozes.update permission.',
      );
    }
  }
}
// [END monitoring_v3_snoozeservice_snooze_update_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await updateSnooze(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project ID like 'example-project-id'
  - Snooze ID like 'snooze-12345'

Usage:

  node snooze-service-client-snooze-update-async.js example-project-id snooze-12345`,
    );
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  updateSnooze,
};
