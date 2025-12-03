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

// [START bigqueryreservation_v1_reservationservice_assignment_create]
const {
  ReservationServiceClient,
} = require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Creates an assignment to assign a project to a reservation.
 * A reservation assignment lets a project submit jobs of a certain type
 * using slots from the specified reservation.
 *
 * @param {string} projectId Google Cloud Project ID that owns the reservation, for example 'example-project-id'.
 * @param {string} location Google Cloud Location, for example 'us-central1'.
 * @param {string} reservationId The ID of the reservation to which the project will be assigned, for example 'example-reservation'.
 */
async function createAssignment(
  projectId,
  location = 'us-central1',
  reservationId = 'example-reservation',
) {
  const parent = client.reservationPath(projectId, location, reservationId);
  const request = {
    parent,
    assignment: {
      assignee: `projects/${projectId}`,
      jobType: 'QUERY',
    },
  };

  try {
    const [assignment] = await client.createAssignment(request);
    console.log(`Created assignment: ${assignment.name}`);
    console.log(`  Assignee: ${assignment.assignee}`);
    console.log(`  Job Type: ${assignment.jobType}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Assignment for project ${projectId} to reservation ${reservationId} already exists.`,
      );
    } else {
      console.error('Error creating assignment:', err);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_assignment_create]

module.exports = {
  createAssignment,
};
