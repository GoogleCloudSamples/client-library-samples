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

// [START bigqueryreservation_v1_reservationservice_assignments_list]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const reservationServiceClient = new ReservationServiceClient();

/**
 * Lists assignments.
 * An assignment lets a project, folder, or organization use slots from a
 * specified reservation. By using a wildcard `-` for the reservation ID,
 * this sample lists all assignments for a given project and location.
 *
 * @param {string} projectId The ID of the project. Example: 'example-project-id'
 * @param {string} location The location of the reservation. Example: 'us-central1'
 */
async function listAssignments(projectId, location = 'us-central1') {
  const request = {
    parent: `projects/${projectId}/locations/${location}/reservations/-`,
  };

  try {
    const iterable = reservationServiceClient.listAssignmentsAsync(request);
    console.log(`Assignments in parent "${request.parent}":`);

    let found = false;
    for await (const assignment of iterable) {
      found = true;
      console.log(`- ${assignment.name}`);
      console.log(`  - Assignee: ${assignment.assignee}`);
      console.log(`  - Job Type: ${assignment.jobType}`);
    }

    if (!found) {
      console.log('  No assignments found.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Parent resource not found: ${request.parent}`);
    } else {
      console.error('Error listing assignments:', err);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_assignments_list]

module.exports = {
  listAssignments,
};
