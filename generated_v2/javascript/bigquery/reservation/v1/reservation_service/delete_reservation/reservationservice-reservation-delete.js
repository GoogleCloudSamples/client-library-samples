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

// [START bigqueryreservation_v1_reservationservice_reservation_delete]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Deletes an existing BigQuery reservation.
 *
 * @param {string} projectId - The Google Cloud project ID that owns the reservation.
 * @param {string} locationId - The geographic location of the reservation (for example, 'US', 'EU', or 'us-central1').
 * @param {string} reservationId - The ID of the reservation to delete.
 */
async function deleteReservation(projectId, locationId, reservationId) {
  try {
    const name = client.reservationPath(projectId, locationId, reservationId);
    const request = {
      name,
    };

    await client.deleteReservation(request);
    console.log(`Reservation deleted: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Reservation not found: ${reservationId}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(
        `Reservation ${reservationId} has active assignments and cannot be deleted.`
      );
    } else if (err.code) {
      console.error(`API error deleting reservation: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteReservation };
// [END bigqueryreservation_v1_reservationservice_reservation_delete]
