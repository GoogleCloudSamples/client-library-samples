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

// [START bigqueryreservation_v1_reservationservice_iampolicy_get]
// [START bigqueryreservation_reservationservice_iampolicy_get]
const {
  ReservationServiceClient,
} = require('@google-cloud/bigquery-reservation').v1;
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Gets the IAM policy for a reservation.
 * An IAM policy is a collection of bindings that associates one or more members,
 * such as service accounts or users, with a single role.
 *
 * @param {string} projectId - Google Cloud project ID, for example "example-project-id".
 * @param {string} location - Location of the reservation, for example "us-central1".
 * @param {string} reservationId - ID of the reservation, for example "example-reservation".
 */
async function getReservationIamPolicy(
  projectId,
  location = 'us-central1',
  reservationId = 'example-reservation',
) {
  const resource = `projects/${projectId}/locations/${location}/reservations/${reservationId}`;
  const request = {
    resource,
  };

  try {
    const [policy] = await client.getIamPolicy(request);

    console.log(`Policy for reservation ${reservationId}:`);
    if (policy.bindings && policy.bindings.length > 0) {
      console.log(JSON.stringify(policy.bindings, null, 2));
    } else {
      console.log('This reservation has no policy bindings.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Reservation '${reservationId}' not found in project '${projectId}' at location '${location}'.`,
      );
    } else {
      console.error('Error getting IAM policy:', err);
    }
  }
}
// [END bigqueryreservation_reservationservice_iampolicy_get]
// [END bigqueryreservation_v1_reservationservice_iampolicy_get]

module.exports = {
  getReservationIamPolicy,
};
