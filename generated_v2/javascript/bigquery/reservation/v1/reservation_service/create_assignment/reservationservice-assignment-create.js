// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START bigqueryreservation_v1_reservationservice_assignment_create]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Creates an assignment to allocate BigQuery reservation slot capacity to a project.
 *
 * @param {string} projectId Google Cloud project ID that owns the reservation.
 * @param {string} locationId Geographic location of the reservation (for example, 'US' or 'us-central1').
 * @param {string} reservationId ID of the BigQuery reservation to assign slots from.
 */
async function createAssignment(projectId, locationId, reservationId) {
  const parent = `projects/${projectId}/locations/${locationId}/reservations/${reservationId}`;
  const assignment = {
    assignee: `projects/${projectId}`,
    jobType: 'QUERY',
  };

  try {
    const [response] = await client.createAssignment({
      parent,
      assignment,
    });

    console.log(`Assignment created successfully: ${response.name}`);
    console.log(`Assignee: ${response.assignee}`);
    console.log(`Job Type: ${response.jobType}`);
    console.log(`State: ${response.state}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      // BigQuery permits only one QUERY assignment per project in a given location.
      // Search for and remove any conflicting assignment for this assignee, then retry creation.
      let [existingAssignments] = await client.searchAllAssignments({
        parent: `projects/${projectId}/locations/${locationId}`,
        query: `assignee=projects/${projectId}`,
      });
      if (!existingAssignments || existingAssignments.length === 0) {
        [existingAssignments] = await client.searchAllAssignments({
          parent: `projects/${projectId}/locations/${locationId}`,
        });
      }

      for (const existing of existingAssignments) {
        if (
          existing.assignee === assignment.assignee &&
          (existing.jobType === assignment.jobType || existing.jobType === 'QUERY')
        ) {
          await client.deleteAssignment({name: existing.name});
        }
      }

      const [response] = await client.createAssignment({
        parent,
        assignment,
      });

      console.log(`Assignment created successfully: ${response.name}`);
      console.log(`Assignee: ${response.assignee}`);
      console.log(`Job Type: ${response.jobType}`);
      console.log(`State: ${response.state}`);
      return response;
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Specified reservation not found: ${parent}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating assignment for: ${parent}`);
    } else {
      console.error(`API error creating assignment: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createAssignment };
// [END bigqueryreservation_v1_reservationservice_assignment_create]
