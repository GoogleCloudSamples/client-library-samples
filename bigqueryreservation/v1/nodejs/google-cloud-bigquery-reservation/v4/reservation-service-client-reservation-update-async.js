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

// [START bigqueryreservation_v1_reservationservice_reservation_update_async]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Updates an existing reservation resource by changing its slot capacity.
 *
 * A reservation provides computational resource guarantees, in the form of
 * slots, to users. This sample demonstrates how to update the number of slots
 * allocated to an existing reservation.
 *
 * @param {string} [projectId='your-project-id'] The Google Cloud project ID.
 * @param {string} [location='us-central1'] The location of the reservation (e.g., 'us-central1').
 * @param {string} [reservationId='your-reservation-id'] The ID of the reservation to update.
 */
async function updateReservation(
  projectId,
  location = 'us-central1',
  reservationId = 'your-reservation-id',
) {
  const newSlotCapacity = 500;

  const reservationName = client.reservationPath(
    projectId,
    location,
    reservationId,
  );

  const request = {
    reservation: {
      name: reservationName,
      slotCapacity: newSlotCapacity,
    },
    // The updateMask specifies which fields of the Reservation to update.
    updateMask: {
      paths: ['slot_capacity'],
    },
  };

  try {
    const [response] = await client.updateReservation(request);
    console.log(`Reservation '${response.name}' updated successfully.`);
    console.log(`New slot capacity: ${response.slotCapacity}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Reservation '${reservationName}' not found. Please ensure the reservation ID and location are correct.`,
      );
      console.error(
        `Corrective action: Verify that the reservation name '${reservationName}' exists and is accessible.`,
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Permission denied to update reservation '${reservationName}'. Please ensure your account has the necessary permissions (e.g., BigQuery Resource Admin role) for project '${projectId}'.`,
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(
        `Invalid argument provided for reservation update: ${err.message}. This might be due to an invalid slot capacity value or other request parameters.`,
      );
      console.error(
        `Corrective action: Review the API documentation for updateReservation and check your request parameters, especially the 'newSlotCapacity' value (${newSlotCapacity}).`,
      );
    } else {
      console.error(
        `An unexpected error occurred while updating reservation '${reservationName}':`,
        err.message,
      );
      console.error(
        'Please check the error details and your request parameters.',
      );
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_reservation_update_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(
      `This script requires 3 arguments, but received ${args.length}.`,
    );
  }
  await updateReservation(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Reservation ID like 'my-reservation-id'

Usage:

 node updateReservation.js my-project-id us-central1 my-reservation-id
`);
    process.exitCode = 1;
  });
  process.on('unhandledRejection', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Reservation ID like 'my-reservation-id'

Usage:

 node updateReservation.js my-project-id us-central1 my-reservation-id
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  updateReservation,
};
