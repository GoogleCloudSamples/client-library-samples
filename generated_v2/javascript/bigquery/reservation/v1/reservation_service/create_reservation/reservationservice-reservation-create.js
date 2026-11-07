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

// [START bigqueryreservation_v1_reservationservice_reservation_create]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Creates a BigQuery reservation.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The geographic location for the reservation (for example, 'US' or 'us-central1').
 * @param {string} reservationId - Caller-chosen identifier for the reservation.
 */
async function createReservation(projectId, locationId, reservationId) {
  const parent = `projects/${projectId}/locations/${locationId}`;
  const reservation = {
    slotCapacity: 100,
    edition: 'ENTERPRISE',
  };

  try {
    const [response] = await client.createReservation({
      parent,
      reservationId,
      reservation,
    });

    console.log(`Created reservation: ${response.name}`);
    console.log(`Slot capacity: ${response.slotCapacity}`);
    console.log(`Edition: ${response.edition}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Reservation ${reservationId} already exists in ${parent}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when attempting to create the reservation.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API request failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createReservation };
// [END bigqueryreservation_v1_reservationservice_reservation_create]
