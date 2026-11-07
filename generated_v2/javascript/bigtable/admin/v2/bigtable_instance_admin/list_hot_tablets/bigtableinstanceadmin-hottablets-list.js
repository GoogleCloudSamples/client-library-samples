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

// [START bigtable_v2_bigtableinstanceadmin_hottablets_list]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Lists hot tablets for a Bigtable cluster.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The ID of the existing Bigtable instance (for example, 'example-instance'). This is a caller-chosen identifier.
 * @param {string} clusterId - The ID of the existing Bigtable cluster within the instance (for example, 'example-cluster'). This is a caller-chosen identifier.
 */
async function listHotTablets(projectId, instanceId, clusterId) {
  try {
    const parent = `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`;
    const request = {
      parent,
    };

    const [hotTablets] = await client.listHotTablets(request);

    console.log(`Retrieved ${hotTablets.length} hot tablet(s).`);
    for (const tablet of hotTablets) {
      console.log(`Hot tablet: ${tablet.name}`);
      console.log(`  Table: ${tablet.tableName}`);
      console.log(`  Node CPU usage percent: ${tablet.nodeCpuUsagePercent}%`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listHotTablets };
// [END bigtable_v2_bigtableinstanceadmin_hottablets_list]
