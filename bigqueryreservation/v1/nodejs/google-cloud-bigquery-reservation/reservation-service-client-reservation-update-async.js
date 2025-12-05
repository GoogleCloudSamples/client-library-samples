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

// [START bigqueryreservation_v1_reservationservice_reservation_update]
// [START bigqueryreservation_reservationservice_reservation_update]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Updates an existing reservation resource.
 * A reservation is a mechanism used to guarantee slots to users. This sample
 * shows how to change the slot capacity of a reservation.
 * @param {string} projectId Google Cloud project ID. for example 'example-project-id'.
 * @param {string} location Google Cloud location. for example 'us-central1'.
 * @param {string} reservationId ID of the reservation to update. for example 'example-reservation'.
 */
async function updateReservation(
  projectId,
  location = 'us-central1',
  reservationId = 'example-group-reservation',
) {
  const request = {
    reservation: {
      name: client.reservationPath(projectId, location, reservationId),
      slotCapacity: 150,
    },
    updateMask: {
      paths: ['slot_capacity'],
    },
  };

  try {
    const [updatedReservation] = await client.updateReservation(request);
    console.log(`Updated reservation: ${updatedReservation.name}`);
    console.log(`  New slot capacity: ${updatedReservation.slotCapacity}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Reservation "${reservationId}" not found in project "${projectId}" location "${location}".`,
      );
    } else {
      console.error(`Error updating reservation "${reservationId}":`, err);
    }
  }
}
// [END bigqueryreservation_reservationservice_reservation_update]
// [END bigqueryreservation_v1_reservationservice_reservation_update]

module.exports = {
  updateReservation,
};
