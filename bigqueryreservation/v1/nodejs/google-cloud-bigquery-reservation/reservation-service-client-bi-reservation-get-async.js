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

// [START bigqueryreservation_v1_reservationservice_bireservation_get]
// [START bigqueryreservation_reservationservice_bireservation_get]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Retrieves a BI reservation.
 * A BI reservation is a singleton resource in a location.
 * @param {string} projectId Google Cloud project ID, for example 'example-project-id'.
 * @param {string} location Google Cloud location, for example 'US'.
 */
async function getBiReservation(projectId, location = 'US') {
  const name = client.biReservationPath(projectId, location);
  const request = {
    name,
  };

  try {
    const [reservation] = await client.getBiReservation(request);
    console.log(`Got BI reservation: ${reservation.name}`);
    console.log(`  Size: ${reservation.size} bytes`);
    if (reservation.updateTime) {
      const updateTime = new Date(
        reservation.updateTime.seconds * 1000 +
          reservation.updateTime.nanos / 1000000,
      );
      console.log(`  Last updated: ${updateTime.toISOString()}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `BI reservation not found for project ${projectId} in location ${location}.`,
      );
    } else {
      console.error('Error getting BI reservation:', err);
    }
  }
}
// [END bigqueryreservation_reservationservice_bireservation_get]
// [END bigqueryreservation_v1_reservationservice_bireservation_get]

module.exports = {
  getBiReservation,
};
