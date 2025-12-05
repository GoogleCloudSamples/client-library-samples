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

// [START bigqueryreservation_v1_reservationservice_reservation_delete]
// [START bigqueryreservation_reservationservice_reservation_delete]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('google-gax');

const client = new ReservationServiceClient();

/**
 * Deletes a reservation.
 * A reservation provides computational resource guarantees, in the form of slots, to users.
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} location The geographic location where the reservation resides, for example 'us-central1'.
 * @param {string} reservationId The ID of the reservation to delete, for example 'example-reservation'.
 */
async function deleteReservation(
  projectId,
  location = 'us-central1',
  reservationId = 'example-reservation',
) {
  // Construct the fully-qualified path for the reservation.
  const name = client.reservationPath(projectId, location, reservationId);

  const request = {
    name,
  };

  try {
    await client.deleteReservation(request);
    console.log(`Deleted reservation: ${reservationId}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Reservation ${reservationId} not found in project ${projectId} location ${location}.`,
      );
    } else {
      console.error(`Error deleting reservation ${reservationId}:`, err);
    }
  }
}
// [END bigqueryreservation_reservationservice_reservation_delete]
// [END bigqueryreservation_v1_reservationservice_reservation_delete]

module.exports = {
  deleteReservation,
};
