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

// [START bigqueryreservation_v1_reservationservice_reservationgroup_create]
// [START bigqueryreservation_reservationservice_reservationgroup_create]
const {ReservationServiceClient} =
  require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Creates a new reservation group.
 * A reservation group is a container for reservations. This can be useful for
 * managing reservations for different teams or workloads.
 *
 * @param projectId Google Cloud project ID, for example 'example-project-id'.
 * @param location The Google Cloud location where the reservation group will be created, for example 'us-central1'.
 * @param reservationGroupId The ID to use for the reservation group, for example 'example-reservation-group'.
 */
async function createReservationGroup(projectId,
  location = 'us-central1',
  reservationGroupId = 'example-group-reservation',) {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    reservationGroupId,
    reservationGroup: {},
  };

  try {
    const [reservationGroup] = await client.createReservationGroup(request);
    console.log(`Created reservation group: ${reservationGroup.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Reservation group '${reservationGroupId}' already exists in project '${projectId}' in location '${location}'.`,
      );
    } else {
      console.error('Error creating reservation group:', err);
    }
  }
}
// [END bigqueryreservation_reservationservice_reservationgroup_create]
// [END bigqueryreservation_v1_reservationservice_reservationgroup_create]

module.exports = {
  createReservationGroup,
};
