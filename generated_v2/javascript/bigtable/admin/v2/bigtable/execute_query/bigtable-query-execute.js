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

// [START bigtable_v2_bigtable_execute_query]
'use strict';

const {BigtableClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableClient();

/**
 * Executes a query against a Cloud Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The ID of the Bigtable instance (for example, 'example-instance').
 */
async function executeQuery(projectId, instanceId) {
  try {
    const params = {};
    const query = 'SELECT 1';
    const instanceName = `projects/${projectId}/instances/${instanceId}`;

    const request = {
      instanceName,
      query,
      params,
    };

    const stream = client.executeQuery(request);

    for await (const response of stream) {
      console.log('Received query response:', response);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance ${instanceId} not found: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Bigtable API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { executeQuery };
// [END bigtable_v2_bigtable_execute_query]
