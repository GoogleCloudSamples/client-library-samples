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

// [START bigqueryreservation_v1_reservationservice_reservations_list]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Lists all reservations for the project in the specified location.
 *
 * A reservation provides computational resource guarantees, in the form of
 * slots, to users.
 *
 * @param {string} projectId Google Cloud project ID. for example 'example-project-id'
 * @param {string} location Google Cloud location. for example 'us-central1'
 */
async function listReservations(projectId, location = 'us-central1') {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
  };

  try {
    const [reservations] = await client.listReservations(request);

    if (reservations.length === 0) {
      console.log(
        `No reservations found in project ${projectId} in location ${location}.`,
      );
      return;
    }

    console.log(
      `Reservations in project ${projectId} in location ${location}:`,
    );
    for (const reservation of reservations) {
      console.log(`- Reservation: ${reservation.name}`);
      console.log(`  Slot capacity: ${reservation.slotCapacity}`);
      console.log(`  Ignore idle slots: ${reservation.ignoreIdleSlots}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Project or location not found: ${request.parent}`);
    } else {
      console.error('An error occurred while listing reservations:', err);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_reservations_list]

module.exports = {
  listReservations,
};
