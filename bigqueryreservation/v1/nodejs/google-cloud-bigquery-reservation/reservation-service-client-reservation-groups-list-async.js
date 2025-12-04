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

// [START bigqueryreservation_v1_reservationservice_reservationgroups_list]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Lists all reservation groups for a project in a specified location.
 * A reservation group is a container for reservations.
 *
 * @param {string} projectId Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location Google Cloud location (for example, 'us-central1').
 */
async function listReservationGroups(projectId, location = 'us-central1') {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
  };

  try {
    const [reservationGroups] = await client.listReservationGroups(request);

    if (reservationGroups.length === 0) {
      console.log(
        `No reservation groups found in project ${projectId} at location ${location}.`,
      );
      return;
    }

    console.log(
      `Reservation groups in project ${projectId} at location ${location}:`,
    );
    for (const group of reservationGroups) {
      console.log(`  ${group.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Project or location not found: ${request.parent}`);
    } else {
      console.error('Error listing reservation groups:', err);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_reservationgroups_list]

module.exports = {
  listReservationGroups,
};
