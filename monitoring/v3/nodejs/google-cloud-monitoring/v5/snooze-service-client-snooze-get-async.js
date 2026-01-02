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

// [START monitoring_v3_snoozeservice_snooze_get_async]
const {SnoozeServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new SnoozeServiceClient();

/**
 * Retrieves a specific Snooze by its name.
 *
 * A Snooze temporarily prevents an alert policy from generating alerts.
 * This sample demonstrates how to fetch the details of an existing Snooze.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} snoozeId The ID of the Snooze to retrieve (for example, '12345')
 */
async function getSnooze(projectId, snoozeId = '12345') {
  const name = client.snoozePath(projectId, snoozeId);

  const request = {
    name,
  };

  try {
    const [snooze] = await client.getSnooze(request);
    console.log(snooze.name);
    console.log(`	Display Name: ${snooze.displayName}`);
    if (snooze.interval && snooze.interval.endTime) {
      const endTime = new Date(
        snooze.interval.endTime.seconds * 1000 +
          snooze.interval.endTime.nanos / 1000000,
      );
      console.log(`	End Time: ${endTime}`);
    }
    if (snooze.criteria && snooze.criteria.filter) {
      console.log(`	Filter: ${snooze.criteria.filter}`);
    }
    if (
      snooze.criteria &&
      snooze.criteria.policies &&
      snooze.criteria.policies.length > 0
    ) {
      console.log(`	Policies affected: ${snooze.criteria.policies.join(', ')}`);
    }
    if (snooze.interval && snooze.interval.startTime) {
      const startTime = new Date(
        snooze.interval.startTime.seconds * 1000 +
          snooze.interval.startTime.nanos / 1000000,
      );
      console.log(`	Start Time: ${startTime}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Snooze '${name}' not found.`);
      console.error(
        'Make sure the Snooze ID is correct and exists in the project.',
      );
    } else {
      console.error('Error retrieving Snooze:', err.message);
    }
  }
}
// [END monitoring_v3_snoozeservice_snooze_get_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getSnooze(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Snooze ID like '12345'

  Usage:

   node snooze-service-client-snooze-get-async.js example-project-168 12345
`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {getSnooze};
