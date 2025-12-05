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

// [START bigqueryreservation_v1_reservationservice_bireservation_update]
// [START bigqueryreservation_reservationservice_bireservation_update]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Updates a BI reservation.
 * A singleton BI reservation always exists with a default size of 0. To reserve
 * BI capacity, you must update the reservation to an amount greater than 0. To
 * release BI capacity, set the reservation size to 0.
 *
 * @param {string} projectId Google Cloud Project ID, for example 'example-project-id'
 * @param {string} location Google Cloud Location, for example 'US'
 */
async function updateBiReservation(projectId, location = 'US') {
  const biReservation = {
    name: client.biReservationPath(projectId, location),
    // Set the reservation size in bytes. This example sets it to 2 GiB.
    size: 2 * 1024 * 1024 * 1024,
  };
  const updateMask = {
    paths: ['size'],
  };

  const request = {
    biReservation,
    updateMask,
  };

  try {
    const [updatedReservation] = await client.updateBiReservation(request);
    console.log(`Updated BI reservation: ${updatedReservation.name}`);
    console.log(`  Size: ${updatedReservation.size} bytes`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `BI Reservation not found for project ${projectId} in location ${location}.`,
      );
    } else {
      console.error('Error updating BI reservation:', err);
    }
  }
}
// [END bigqueryreservation_reservationservice_bireservation_update]
// [END bigqueryreservation_v1_reservationservice_bireservation_update]

module.exports = {
  updateBiReservation,
};
