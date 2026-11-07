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

// [START bigqueryreservation_v1_reservationservice_assignments_search]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Searches assignments within a parent resource.
 */
async function searchAssignments() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = client.locationPath(projectId, location);

    const request = {
      parent,
      query: `assignee=projects/${projectId}`,
    };

    const [assignments] = await client.searchAssignments(request);

    if (assignments.length === 0) {
      console.log('No assignments found matching the search criteria.');
      return;
    }

    console.log(`Found ${assignments.length} assignment(s):`);
    for (const assignment of assignments) {
      console.log(`- Name: ${assignment.name}`);
      console.log(`  Assignee: ${assignment.assignee}`);
      console.log(`  Job type: ${assignment.jobType}`);
      console.log(`  State: ${assignment.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument:', err.message);
    } else {
      console.error('Failed to search assignments:', err);
    }
  }
}

module.exports = {searchAssignments};
// [END bigqueryreservation_v1_reservationservice_assignments_search]
