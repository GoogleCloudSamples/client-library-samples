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

// [START bigqueryreservation_v1_reservationservice_delete_reservation_async]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Deletes a reservation.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-id')
 * @param {string} location The Google Cloud location of the reservation (e.g., 'us-central1')
 * @param {string} reservationId The ID of the reservation to delete (e.g., 'my-reservation-id')
 */
async function deleteReservation(projectId, location, reservationId) {
  const name = client.reservationPath(projectId, location, reservationId);

  const request = {
    name: name,
  };

  try {
    await client.deleteReservation(request);
    console.log(
      `Reservation ${reservationId} in ${location} deleted successfully.`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Reservation ${reservationId} not found in location ${location} of project ${projectId}.`,
      );
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.log(
        `Reservation ${reservationId} cannot be deleted because it has active assignments. Please delete all assignments first.`,
      );
      console.error(err);
    } else {
      console.error(`Error deleting reservation ${reservationId}:`, err);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_delete_reservation_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(
      `This script requires 3 arguments, but received ${args.length}.`,
    );
  }
  await deleteReservation(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
  - Your Google Cloud Project ID (e.g., 'my-project-id')
  - The Google Cloud location of the reservation (e.g., 'us-central1')
  - The ID of the reservation to delete (e.g., 'my-reservation-id')

Usage:

  node reservation-service-client-reservation-delete-async.js my-project-id us-central1 my-reservation-id`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {deleteReservation};
