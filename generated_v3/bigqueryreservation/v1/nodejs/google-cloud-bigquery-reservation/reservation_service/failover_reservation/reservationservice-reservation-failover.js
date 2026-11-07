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

// [START bigqueryreservation_v1_reservationservice_failover_reservation]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Promotes a secondary replica reservation to primary.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The current secondary location of the reservation to be promoted to primary (for example, 'us-central1' or 'US').
 * @param {string} reservationId - The ID of the reservation to fail over.
 */
async function failoverReservation(projectId, locationId, reservationId) {
  try {
    // Construct the resource name for the secondary replica reservation.
    const name = client.reservationPath(projectId, locationId, reservationId);

    const request = {
      name,
    };

    const [reservation] = await client.failoverReservation(request);
    console.log(`Failover completed for reservation: ${reservation.name}`);
    console.log(`Original primary location: ${reservation.originalPrimaryLocation}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.error(
        `Failed precondition error: Ensure the location is the secondary replica. Details: ${err.message}`
      );
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Reservation not found: ${err.message}`);
    } else {
      console.error(`Error failing over reservation: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { failoverReservation };
// [END bigqueryreservation_v1_reservationservice_failover_reservation]
