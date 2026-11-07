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

// [START bigqueryreservation_v1_reservationservice_reservationgroups_list]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Lists reservation groups in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'US', 'EU', or 'us-central1').
 */
async function listReservationGroups(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [reservationGroups] = await client.listReservationGroups({
      parent,
    });

    if (reservationGroups.length === 0) {
      console.log('No reservation groups found.');
    } else {
      for (const group of reservationGroups) {
        console.log(`Reservation group: ${group.name}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Parent resource was not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to access the specified resource.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listReservationGroups };
// [END bigqueryreservation_v1_reservationservice_reservationgroups_list]
