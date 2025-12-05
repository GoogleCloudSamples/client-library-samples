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

// [START bigqueryreservation_v1_reservationservice_reservationgroup_delete]
// [START bigqueryreservation_reservationservice_reservationgroup_delete]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Deletes the specified reservation group.
 * A reservation group can only be deleted if it contains no reservations.
 * @param {string} projectId Google Cloud Project ID, for example 'example-project-id'.
 * @param {string} location Google Cloud Location, for example 'us-central1'.
 * @param {string} reservationGroupId The ID of the reservation group to delete, for example 'example-reservation-group'.
 */
async function deleteReservationGroup(
  projectId,
  location = 'us-central1',
  reservationGroupId = 'example-group-reservation',
) {
  const request = {
    name: client.reservationGroupPath(projectId, location, reservationGroupId),
  };

  try {
    await client.deleteReservationGroup(request);
    console.log(`Deleted reservation group: ${reservationGroupId}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Reservation group ${reservationGroupId} does not exist in location ${location} of project ${projectId}.`,
      );
    } else {
      console.error(
        `Error deleting reservation group ${reservationGroupId}:`,
        err,
      );
    }
  }
}
// [END bigqueryreservation_reservationservice_reservationgroup_delete]
// [END bigqueryreservation_v1_reservationservice_reservationgroup_delete]

module.exports = {
  deleteReservationGroup,
};
