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

// [START bigqueryreservation_v1_reservationservice_allassignments_search]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Use the searchAllAssignments method
 *
 * @param {string} projectId - The Google Cloud project ID, or '-' as a wildcard to search across all projects.
 * @param {string} locationId - The Google Cloud location ID (for example, 'US', 'EU', 'us-central1').
 * @param {string} query - The search query specifying the assignee resource, for example 'assignee=projects/example-project'.
 */
async function searchAllAssignments(projectId, locationId, query) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
      query,
    };

    // Retrieve assignments matching the specified search query
    const [assignments] = await client.searchAllAssignments(request);

    console.log(`Assignments found: ${assignments.length}`);
    for (const assignment of assignments) {
      console.log(`Assignment name: ${assignment.name}`);
      console.log(`  Assignee: ${assignment.assignee}`);
      console.log(`  Job type: ${assignment.jobType}`);
      console.log(`  State: ${assignment.state}`);
    }

    return assignments;
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while searching assignments: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Search failed with gRPC status code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { searchAllAssignments };
// [END bigqueryreservation_v1_reservationservice_allassignments_search]
