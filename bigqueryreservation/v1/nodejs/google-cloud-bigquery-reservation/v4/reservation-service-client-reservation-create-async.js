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

// [START bigqueryreservation_v1_reservationservice_reservation_create_async]
const {
  ReservationServiceClient,
} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Creates a new BigQuery reservation resource.
 *
 * A reservation provides computational resource guarantees, in the form of
 * slots, to users. This sample demonstrates how to create a new reservation
 * with a specified slot capacity and idle slot behavior.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-123').
 * @param {string} location The location for the reservation (e.g., 'us-central1').
 * @param {string} reservationId The unique ID for the new reservation (e.g., 'my-new-reservation').
 */
async function createReservation(projectId, location, reservationId) {
  const slotCapacity = 100;
  const ignoreIdleSlots = true;

  const parent = `projects/${projectId}/locations/${location}`;

  const reservation = {
    slotCapacity: slotCapacity,
    ignoreIdleSlots: ignoreIdleSlots,
  };

  const request = {
    parent: parent,
    reservationId: reservationId,
    reservation: reservation,
  };

  try {
    const [response] = await client.createReservation(request);
    console.log(`Reservation '${response.name}' created successfully.`);
    console.log(`  Slot Capacity: ${response.slotCapacity}`);
    console.log(`  Ignore Idle Slots: ${response.ignoreIdleSlots}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(
        `Error: Reservation '${reservationId}' already exists in location '${location}' for project '${projectId}'.`,
      );
      console.error(
        'Action: Try a different reservation ID or update the existing reservation if that is the intended operation.',
      );
    } else {
      console.error(`Error creating reservation '${reservationId}':`);
      console.error(`  Code: ${err.code}`);
      console.error(`  Message: ${err.message}`);
      console.error(
        'Action: Please check the error details and ensure the project, location, and permissions are correct.',
      );
    }
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}
// [END bigqueryreservation_v1_reservationservice_reservation_create_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(
      `This script requires 3 arguments, but received ${args.length}.`,
    );
  }
  await createReservation(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
  - Your Google Cloud Project ID (e.g., 'my-project-123').
  - The location for the reservation (e.g., 'us-central1').
  - The unique ID for the new reservation (e.g., 'my-new-reservation').

Usage:

  node reservation-service-client-reservation-create-async.js my-project-123 us-central1 my-new-reservation`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  createReservation,
};
