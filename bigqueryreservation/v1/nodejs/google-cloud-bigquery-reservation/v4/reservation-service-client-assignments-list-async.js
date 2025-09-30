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

// [START bigqueryreservation_v1_reservationservice_assignments_list_async]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Lists all assignments for a given reservation in a project and location.
 *
 * A reservation assignment allows a project to submit jobs of a certain type
 * using slots from a specified reservation. This function retrieves a list of
 * these assignments.
 *
 * @param {string} [projectId='your-project-id'] Your Google Cloud Project ID.
 *   (e.g., 'my-project-123')
 * @param {string} [location='us-central1'] The Google Cloud location of the reservation.
 *   (e.g., 'US')
 * @param {string} [reservationId='my-reservation'] The ID of the reservation.
 *   (e.g., 'my-reservation'). Use '-' to list assignments across all reservations
 *   in the specified project and location.
 */
async function listAssignments(
  projectId,
  location = 'us-central1',
  reservationId = 'my-reservation',
) {
  const parent = `projects/${projectId}/locations/${location}/reservations/${reservationId}`;

  const request = {
    parent: parent,
  };

  try {
    const [assignments] = await client.listAssignments(request);

    if (assignments.length === 0) {
      console.log(
        `No assignments found for reservation '${reservationId}' in ${location}.`,
      );
      return;
    }

    console.log(
      `Assignments for reservation '${reservationId}' in ${location}:`,
    );
    for (const assignment of assignments) {
      console.log(`- Assignment Name: ${assignment.name}`);
      console.log(`  Assignee: ${assignment.assignee}`);
      console.log(`  Job Type: ${assignment.jobType}`);
      console.log(`  State: ${assignment.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The reservation '${reservationId}' in location '${location}' was not found.`,
      );
      console.error(
        'Please ensure the reservation ID and location are correct and the reservation exists.',
      );
    } else {
      console.error('Error listing assignments:', err.message);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_assignments_list_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(
      `This script requires 3 arguments, but received ${args.length}.`,
    );
  }
  await listAssignments(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify arguments:
 - Google Cloud Project ID like 'my-project-123'
 - Google Cloud Location like 'us-central1'
 - Reservation ID like 'my-reservation' (or '-' for all assignments in location)

Usage:
  node reservation-service-client-assignments-list-async.js my-project-123 us-central1 my-reservation
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listAssignments,
};
