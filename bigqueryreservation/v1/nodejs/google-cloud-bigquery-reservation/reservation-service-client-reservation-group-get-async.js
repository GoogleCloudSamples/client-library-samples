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

// [START bigqueryreservation_v1_reservationservice_reservationgroup_get]
// [START bigqueryreservation_reservationservice_reservationgroup_get]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Gets the specified reservation group.
 *
 * A reservation group is a container for reservations.
 *
 * @param projectId Google Cloud Project ID, for example 'example-project-id'.
 * @param location Google Cloud Location, for example 'us-central1'.
 * @param reservationGroupId the ID of the reservation group to get, for example 'example-reservation-group-id'.
 */
async function getReservationGroup(
  projectId,
  location = 'us-central1',
  reservationGroupId = 'example-group-reservation',
) {
  const request = {
    name: client.reservationGroupPath(projectId, location, reservationGroupId),
  };

  try {
    const [reservationGroup] = await client.getReservationGroup(request);
    console.log(`Got reservation group: ${reservationGroup.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Reservation group '${reservationGroupId}' not found in project '${projectId}' at location '${location}'.`,
      );
    } else {
      console.error(
        `Error getting reservation group '${reservationGroupId}':`,
        err,
      );
    }
  }
}
// [END bigqueryreservation_reservationservice_reservationgroup_get]
// [END bigqueryreservation_v1_reservationservice_reservationgroup_get]

module.exports = {
  getReservationGroup,
};
