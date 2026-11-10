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

// [START bigqueryreservation_v1_reservationservice_set_iam_policy]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Updates the IAM policy for a BigQuery reservation.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The geographic location of the reservation (for example, 'US' or 'us-central1').
 * @param {string} reservationId - The caller-specified ID of the reservation on which to set the IAM policy.
 */
async function setIamPolicy(projectId, locationId, reservationId) {
  try {
    const resource = client.reservationPath(projectId, locationId, reservationId);

    // Retrieve the existing IAM policy to preserve the etag and prevent concurrency conflicts
    const [currentPolicy] = await client.getIamPolicy({resource});

    const policy = {
      etag: currentPolicy.etag,
      bindings: [
        ...(currentPolicy.bindings || []),
        {
          role: 'roles/bigquery.resourceAdmin',
          members: [
            `serviceAccount:example-service-account@${projectId}.iam.gserviceaccount.com`,
          ],
        },
      ],
    };

    const [response] = await client.setIamPolicy({
      resource,
      policy,
    });

    console.log(`Successfully updated IAM policy for resource: ${resource}`);
    console.log(`Policy etag: ${response.etag}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Reservation resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while updating IAM policy: ${err.message}`);
    } else if (err.code === status.ABORTED) {
      console.error(`Concurrency conflict encountered: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to set IAM policy: ${err.message}`);
    }
  }
}

module.exports = { setIamPolicy };
// [END bigqueryreservation_v1_reservationservice_set_iam_policy]
