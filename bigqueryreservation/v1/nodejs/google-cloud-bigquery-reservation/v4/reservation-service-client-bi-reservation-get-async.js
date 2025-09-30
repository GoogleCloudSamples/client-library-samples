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

// [START bigqueryreservation_v1_reservationservice_bireservation_get_async]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Retrieves a BI reservation for a given project and location.
 * A BI reservation provides dedicated query capacity for BigQuery BI Engine workloads.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-id')
 * @param {string} location The Google Cloud location of the BI reservation (e.g., 'us-central1')
 */
async function getBiReservation(projectId, location = 'us-central1') {
  const name = `projects/${projectId}/locations/${location}/biReservation`;

  const request = {
    name: name,
  };

  try {
    const [biReservation] = await client.getBiReservation(request);
    console.log('Successfully retrieved BI Reservation:');
    console.log(`  Name: ${biReservation.name}`);
    console.log(
      `  Update Time: ${new Date(parseInt(biReservation.updateTime.seconds) * 1000).toISOString()}`,
    );
    console.log(`  Size: ${biReservation.size} bytes`);
    if (
      biReservation.preferredTables &&
      biReservation.preferredTables.length > 0
    ) {
      console.log('  Preferred Tables:');
      biReservation.preferredTables.forEach(table => {
        console.log(
          `    - ${table.projectId}:${table.datasetId}.${table.tableId}`,
        );
      });
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `BI Reservation '${name}' not found. Please ensure it exists and you have permissions.`,
      );
      console.error(
        'You might need to create or update a BI reservation first.',
      );
    } else {
      console.error('Error getting BI Reservation:', err.message);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_bireservation_get_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getBiReservation(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
  - Your Google Cloud Project ID (e.g., 'my-project-id')
  - The Google Cloud location of the BI reservation (e.g., 'us-central1')

Usage:

  node reservation-service-client-bi-reservation-get-async.js my-project-id us-central1`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {getBiReservation};
