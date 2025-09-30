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

// [START monitoring_v3_snoozeservice_list_snoozes_async]
const {SnoozeServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new SnoozeServiceClient();

/**
 * Lists all snoozes associated with a Google Cloud project.
 *
 * This function demonstrates how to retrieve a list of snoozes, which are
 * used to temporarily prevent alert policies from generating alerts.
 *
 * @param {string} [projectId='example-project-id'] Your Google Cloud Project ID.
 *     (for example, 'example-project-id'). If not provided, a default value is used.
 */
async function listSnoozes(projectId) {
  const parent = client.projectPath(projectId);

  const request = {
    parent,
  };

  try {
    const [snoozes] = await client.listSnoozes(request);

    if (snoozes.length === 0) {
      console.log(`No snoozes found for project ${projectId}.`);
      return;
    }

    console.log(`Snoozes for project ${projectId}:`);
    for (const snooze of snoozes) {
      console.log(snooze.name);
      console.log(`	Display Name: ${snooze.displayName || 'N/A'}`);
      if (snooze.interval && snooze.interval.endTime) {
        const endTime = new Date(
          snooze.interval.endTime.seconds * 1000 +
            snooze.interval.endTime.nanos / 1000000,
        );
        console.log(`	End Time: ${endTime}`);
      }
      if (snooze.interval && snooze.interval.startTime) {
        const startTime = new Date(
          snooze.interval.startTime.seconds * 1000 +
            snooze.interval.startTime.nanos / 1000000,
        );
        console.log(`	Start Time: ${startTime}`);
      }
      console.log('---');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' not found or you do not have permission to access it.`,
      );
      console.error(
        'Make sure the project ID is correct and your service account has the necessary permissions (for example, Monitoring Viewer).',
      );
    } else {
      console.error('Error listing snoozes:', err.message);
    }
  }
}
// [END monitoring_v3_snoozeservice_list_snoozes_async]

/**
 * Main function to parse arguments and call the listSnoozes function.
 * @param {string[]} args Command-line arguments.
 */
async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await listSnoozes(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify one argument:
 - Google Cloud Project ID like 'example-project-id'

Usage:

 node snooze-service-client-snoozes-list-async.js example-project-id
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listSnoozes,
};
