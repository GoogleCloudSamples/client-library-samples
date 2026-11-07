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

// [START capacityplanner_v1beta_usageservice_query_reservations]
'use strict';

const {UsageServiceClient} = require('@google-cloud/capacityplanner');
const {status} = require('@grpc/grpc-js');

const client = new UsageServiceClient();

/**
 * Use the queryReservations method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function queryReservations(projectId, locationId) {
  try {
    const reservationDataLevel = 'RESERVATION_DATA_LEVEL_AGGREGATED';
    const parent = `projects/${projectId}/locations/${locationId}`;
    const reservationType = 'RESERVATION_TYPE_ALL';
    const cloudResourceType = 'gce-vcpus';

    const request = {
      parent,
      cloudResourceType,
      reservationType,
      reservationDataLevel,
    };

    const [response] = await client.queryReservations(request);
    console.log('Query reservations response:');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { queryReservations };
// [END capacityplanner_v1beta_usageservice_query_reservations]
