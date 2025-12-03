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

// [START bigqueryreservation_v1_reservationservice_reservation_create]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Creates a new reservation.
 * A reservation provides computational resource guarantees, in the form of
 * slots, to users. A slot is a unit of computational power in BigQuery.
 *
 * @param {string} projectId Google Cloud project ID, for example 'example-project-id'.
 * @param {string} location The geographic location where the reservation should reside, for example 'us-central1'.
 * @param {string} reservationId The ID of the reservation to create, for example 'example-reservation'.
 */
async function createReservation(
  projectId,
  location = 'us-central1',
  reservationId = 'example-reservation',
) {
  const parent = `projects/${projectId}/locations/${location}`;
  const request = {
    parent,
    reservationId,
    reservation: {
      slotCapacity: 100,
      ignoreIdleSlots: false,
    },
  };

  try {
    const [createdReservation] = await client.createReservation(request);
    console.log(`Created reservation: ${createdReservation.name}`);
    console.log(`  Slot capacity: ${createdReservation.slotCapacity}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Reservation ${reservationId} already exists in project ${projectId} at location ${location}.`,
      );
    } else {
      console.error(`Error creating reservation ${reservationId}:`, err);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_reservation_create]

module.exports = {
  createReservation,
};
