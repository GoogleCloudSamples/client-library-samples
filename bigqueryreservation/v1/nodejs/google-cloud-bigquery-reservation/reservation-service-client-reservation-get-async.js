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

// [START bigqueryreservation_v1_reservationservice_reservation_get]
// [START bigqueryreservation_reservationservice_reservation_get]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Returns information about the reservation.
 * A reservation provides computational resource guarantees, in the form of
 * slots, to users. A slot is a unit of computational power in BigQuery.
 *
 * @param {string} projectId Google Cloud Project ID, for example 'example-project-id'.
 * @param {string} location The geographic location where the reservation resides, for example 'us-central1'.
 * @param {string} reservationId The ID of the reservation to retrieve, for example 'example-reservation'.
 */
async function getReservation(
  projectId,
  location = 'us-central1',
  reservationId = 'example-reservation',
) {
  const request = {
    name: client.reservationPath(projectId, location, reservationId),
  };

  try {
    const [reservation] = await client.getReservation(request);
    console.log(`Got reservation: ${reservation.name}`);
    console.log(`  Slot capacity: ${reservation.slotCapacity}`);
    console.log(`  Ignore idle slots: ${reservation.ignoreIdleSlots}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Reservation '${reservationId}' not found in project '${projectId}' location '${location}'.`,
      );
    } else {
      console.error('Error getting reservation:', err);
    }
  }
}
// [END bigqueryreservation_reservationservice_reservation_get]
// [END bigqueryreservation_v1_reservationservice_reservation_get]

module.exports = {
  getReservation,
};
