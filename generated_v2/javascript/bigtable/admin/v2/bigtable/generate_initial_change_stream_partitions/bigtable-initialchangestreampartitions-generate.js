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

// [START bigtable_v2_bigtable_generate_initial_change_stream_partitions]
'use strict';

const {v2} = require('@google-cloud/bigtable');
const {status} = require('@grpc/grpc-js');

const client = new v2.BigtableClient();

/**
 * Generates initial change stream partitions for a Cloud Bigtable table.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Bigtable instance.
 * @param {string} instanceId - The ID of the Cloud Bigtable instance hosting the table.
 * @param {string} tableId - The ID of the Bigtable table with change streaming enabled.
 */
async function generateInitialChangeStreamPartitions(projectId, instanceId, tableId) {
  try {
    // Construct the resource name for the target table with change streaming enabled
    const tableName = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;

    const request = {
      tableName,
    };

    // The stream emits initial partitions required to read the change stream
    const stream = client.generateInitialChangeStreamPartitions(request);

    for await (const response of stream) {
      console.log(`Stream partition: ${JSON.stringify(response.partition)}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Table not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed (verify change stream status): ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Cloud Bigtable API error [code ${err.code}]: ${err.message}`);
    }
  }
}

module.exports = { generateInitialChangeStreamPartitions };
// [END bigtable_v2_bigtable_generate_initial_change_stream_partitions]
