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

// [START bigqueryreservation_v1_reservationservice_assignment_delete]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Deletes a reservation assignment.
 * This removes the association between a project, folder, or organization and a reservation.
 * After deletion, jobs from the formerly assigned resource will no longer use the reservation's slots.
 *
 * @param {string} projectId Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The location of the reservation (for example, 'us-central1').
 * @param {string} reservationId The ID of the reservation which contains the assignment (for example, 'example-reservation').
 * @param {string} assignmentId The ID of the assignment to delete (for example, 'example-assignment-123').
 */
async function deleteAssignment(
  projectId,
  location = 'us-central1',
  reservationId = 'example-reservation',
  assignmentId = 'example-assignment-123',
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
    console.log(`Deleted assignment: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Assignment not found: ${name}`);
    } else {
      console.error(`Error deleting assignment ${name}:`, err);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_assignment_delete]

module.exports = {deleteAssignment};
