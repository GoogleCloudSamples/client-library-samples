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

// [START bigqueryreservation_v1_reservationservice_assignment_delete_async]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Deletes a BigQuery Reservation assignment.
 *
 * This sample demonstrates how to delete an existing assignment for a reservation.
 * Deleting an assignment removes the association between a project/folder/organization
 * and a reservation, meaning that the assigned entity will no longer use slots
 * from that reservation.
 *
 * @param {string} projectId The ID of the Google Cloud project. (e.g., 'my-project-id')
 * @param {string} [location='us-central1'] The Google Cloud location of the reservation (e.g., 'us-central1').
 * @param {string} [reservationId='my-reservation'] The ID of the reservation. (e.g., 'my-reservation')
 * @param {string} [assignmentId='my-assignment'] The ID of the assignment to delete. (e.g., 'my-assignment')
 */
async function deleteAssignment(
  projectId,
  location = 'us-central1',
  reservationId = 'my-reservation',
  assignmentId = 'my-assignment',
) {
  const name = client.assignmentPath(
    projectId,
    location,
    reservationId,
    assignmentId,
  );

  const request = {
    name,
  };

  try {
    await client.deleteAssignment(request);
    console.log(`Assignment ${assignmentId} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Assignment ${assignmentId} not found in reservation ${reservationId} in location ${location} of project ${projectId}.`,
      );
      console.log(
        'Please ensure the assignment ID and reservation ID are correct and exist.',
      );
    } else {
      console.error(`Error deleting assignment ${name}:`, err);
      console.error(
        'Please check your project, location, reservation, and assignment IDs, and ensure you have the necessary permissions.',
      );
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_assignment_delete_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(
      `This script requires 4 arguments, but received ${args.length}.`,
    );
  }
  await deleteAssignment(args[0], args[1], args[2], args[3]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify four arguments:
  - Google Cloud Project ID (e.g., 'my-project-id')
  - Google Cloud Location (e.g., 'us-central1')
  - Reservation ID (e.g., 'my-reservation')
  - Assignment ID (e.g., 'my-assignment')

  Usage:

   node reservation-service-client-assignment-delete-async.js my-project-id us-central1 my-reservation my-assignment
  `);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteAssignment,
};
