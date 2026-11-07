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

// [START bigqueryreservation_v1_reservationservice_bireservation_update]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Updates a BigQuery BI reservation.
 */
async function updateBiReservation() {
  const projectId = await client.getProjectId();
  const location = 'us-central1';
  const name = client.biReservationPath(projectId, location);

  const request = {
    biReservation: {
      name,
      size: 1073741824, // 1 GiB in bytes
    },
    updateMask: {
      paths: ['size'],
    },
  };

  try {
    const [response] = await client.updateBiReservation(request);
    console.log(`Updated BI reservation: ${response.name}`);
    console.log(`Size in bytes: ${response.size}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`BI reservation not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error updating BI reservation: ${err.message}`);
    }
  }
}

module.exports = {updateBiReservation};
// [END bigqueryreservation_v1_reservationservice_bireservation_update]
