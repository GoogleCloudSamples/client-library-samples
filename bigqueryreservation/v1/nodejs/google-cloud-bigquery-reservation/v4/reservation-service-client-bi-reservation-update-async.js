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

// [START bigqueryreservation_v1_reservationservice_bireservation_update_async]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Updates a BI reservation's size.
 *
 * A singleton BI reservation always exists with default size 0.
 * To reserve BI capacity, update it to an amount greater than 0.
 * To release BI capacity, set the reservation size to 0.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'your-project-id')
 * @param {string} location The Google Cloud location (e.g., 'us-central1')
 * @param {number} biReservationSize The desired size of the BI reservation in bytes (e.g., 1000)
 */
async function updateBiReservation(
  projectId,
  location = 'us-central1',
  biReservationSize = 2000000000,
) {
  const biReservationName = `projects/${projectId}/locations/${location}/biReservation`;

  const biReservation = {
    name: biReservationName,
    size: biReservationSize,
  };

  const updateMask = {
    paths: ['size'],
  };

  const request = {
    biReservation,
    updateMask,
  };

  try {
    const [response] = await client.updateBiReservation(request);
    console.log(`Successfully updated BI Reservation: ${response.name}`);
    console.log(`New size: ${response.size} bytes`);
    if (response.updateTime && response.updateTime.seconds) {
      console.log(
        `Last update time: ${new Date(Number(response.updateTime.seconds) * 1000).toISOString()}`,
      );
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(
        `Invalid argument provided. Please check the project ID, location, or BI reservation size. Error: ${err.message}`,
      );
    } else {
      console.error(`Error updating BI Reservation: ${err.message}`);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_bireservation_update_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(
      `This script requires 3 arguments, but received ${args.length}.`,
    );
  }
  await updateBiReservation(args[0], args[1], parseInt(args[2], 10));
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide arguments:
 - Google Cloud Project ID (e.g., 'your-project-id')
 - Google Cloud Location (e.g., 'us-central1')
 - BI Reservation Size in bytes (e.g., 2000000000)

Usage:

 node reservation-service-client-bi-reservation-update-async.js your-project-id us-central1 2000000000
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

// Export the function for testing or use in other modules.
module.exports = {
  updateBiReservation,
};
