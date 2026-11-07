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

// [START bigtable_v2_bigtable_ping_and_warm]
'use strict';

const {v2} = require('@google-cloud/bigtable');
const {status} = require('@grpc/grpc-js');

/**
 * Pings and warms a Bigtable instance to optimize connection latency.
 *
 * @param {string} projectId Google Cloud project ID.
 * @param {string} instanceId Bigtable instance ID.
 */
async function pingAndWarm(projectId, instanceId) {
  const bigtableClient = new v2.BigtableClient();
  const name = `projects/${projectId}/instances/${instanceId}`;

  const request = {
    name,
  };

  try {
    const [response] = await bigtableClient.pingAndWarm(request);
    console.log(`Ping and warm completed successfully for instance: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      if (err.message?.includes('No tables found') || err.details?.includes('No tables found')) {
        console.log(`Ping and warm completed: no tables exist for instance: ${name}`);
        return {};
      }
      console.error(`Instance not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAVAILABLE) {
      console.error(`Service unavailable: ${err.message}`);
    } else {
      console.error(`Ping and warm request failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {pingAndWarm};
// [END bigtable_v2_bigtable_ping_and_warm]
