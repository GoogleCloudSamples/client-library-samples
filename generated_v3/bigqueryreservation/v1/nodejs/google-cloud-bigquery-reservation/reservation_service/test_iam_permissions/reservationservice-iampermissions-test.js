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

// [START bigqueryreservation_v1_reservationservice_test_iam_permissions]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Tests IAM permissions for a BigQuery reservation.
 *
 * @param {string} projectId - The Google Cloud project ID that owns the reservation.
 * @param {string} locationId - The location of the reservation (for example, 'US' or 'us-central1').
 * @param {string} reservationId - The ID of the reservation to test permissions against.
 */
async function testIamPermissions(projectId, locationId, reservationId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/reservations/${reservationId}`;
    const permissions = [
      'bigquery.reservations.get',
      'bigquery.reservations.update',
    ];

    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    console.log(`Allowed permissions: ${JSON.stringify(response.permissions)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Reservation was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API call failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END bigqueryreservation_v1_reservationservice_test_iam_permissions]
