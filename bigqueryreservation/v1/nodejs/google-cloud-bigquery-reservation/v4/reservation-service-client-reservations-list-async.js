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

// [START bigqueryreservation_v1_reservationservice_reservations_list_async]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Lists all BigQuery reservations in a specified project and location.
 *
 * This method retrieves a paginated list of reservations associated with the
 * given project and location. Each reservation provides computational resource
 * guarantees (slots) for BigQuery jobs.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-id')
 * @param {string} location The Google Cloud location (e.g., 'us-central1')
 */
async function listReservations(projectId, location) {
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent: parent,
  };

  try {
    const [reservations] = await client.listReservations(request);

    if (reservations.length === 0) {
      console.log(
        `No reservations found in location ${location} of project ${projectId}.`,
      );
      return;
    }

    console.log('Reservations:');
    for (const reservation of reservations) {
      console.log(`- Name: ${reservation.name}`);
      console.log(`  Slot Capacity: ${reservation.slotCapacity}`);
      console.log(`  Ignore Idle Slots: ${reservation.ignoreIdleSlots}`);
      if (reservation.autoscale) {
        console.log(`  Autoscale Max Slots: ${reservation.autoscale.maxSlots}`);
      }
      console.log(`  Creation Time: ${reservation.creationTime.toDate()}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The project '${projectId}' or location '${location}' was not found, or no reservations exist for this parent.`,
      );
      console.error(
        'Please ensure the project ID and location are correct and that you have sufficient permissions.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied. Ensure the service account has the 'BigQuery Resource Admin' role for project '${projectId}'.`,
      );
    } else {
      console.error('Error listing reservations:', err.message);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_reservations_list_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await listReservations(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
  - Your Google Cloud Project ID (e.g., 'my-project-id')
  - The Google Cloud location (e.g., 'us-central1')

Usage:

  node reservation-service-client-reservations-list-async.js my-project-id us-central1`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {listReservations};
