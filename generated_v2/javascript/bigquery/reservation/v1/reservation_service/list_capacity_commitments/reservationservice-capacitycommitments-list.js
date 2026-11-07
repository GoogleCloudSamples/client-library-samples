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

// [START bigqueryreservation_v1_reservationservice_capacitycommitments_list]
'use strict';

const {ReservationServiceClient} = require('@google-cloud/bigquery-reservation');
const {status} = require('@grpc/grpc-js');

const client = new ReservationServiceClient();

/**
 * Use the listCapacityCommitments method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The BigQuery location (for example, 'US', 'EU', or 'us-central1').
 */
async function listCapacityCommitments(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [commitments] = await client.listCapacityCommitments(request);

    console.log(`Retrieved ${commitments.length} capacity commitment(s).`);
    for (const commitment of commitments) {
      console.log(`Capacity commitment: ${commitment.name}`);
      console.log(`  Plan: ${commitment.plan}`);
      console.log(`  Slot count: ${commitment.slotCount}`);
      console.log(`  State: ${commitment.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error [code ${err.code}]: ${err.message}`);
    } else {
      console.error(`Execution error: ${err.message}`);
    }
  }
}

module.exports = { listCapacityCommitments };
// [END bigqueryreservation_v1_reservationservice_capacitycommitments_list]
