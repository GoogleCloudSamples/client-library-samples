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

// [START bigqueryreservation_v1_reservationservice_reservation_update]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Use the updateReservation method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the BigQuery reservation (e.g., 'us-central1' or 'US').
 * @param {string} reservationId - The ID of the reservation to update. Must contain only lowercase alphanumeric characters or dashes, start with a letter, and not end with a dash (up to 64 characters).
 */
async function updateReservation(projectId, locationId, reservationId) {
  try {
    const reservation = {
      name: client.reservationPath(projectId, locationId, reservationId),
      labels: {
        environment: 'production',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    const [response] = await client.updateReservation({
      reservation,
      updateMask,
    });

    console.log(`Updated reservation: ${response.name}`);
    console.log(`Labels: ${JSON.stringify(response.labels)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Reservation not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { updateReservation };
// [END bigqueryreservation_v1_reservationservice_reservation_update]
