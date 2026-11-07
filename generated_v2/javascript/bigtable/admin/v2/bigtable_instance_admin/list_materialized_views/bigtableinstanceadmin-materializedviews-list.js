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

// [START bigtable_v2_bigtableinstanceadmin_materializedviews_list]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Lists Bigtable materialized views for an instance.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - Bigtable instance ID (for example, 'example-instance-id').
 */
async function listMaterializedViews(projectId, instanceId) {
  const client = new BigtableInstanceAdminClient();

  try {
    const parent = `projects/${projectId}/instances/${instanceId}`;
    const request = {
      parent,
    };

    const [materializedViews] = await client.listMaterializedViews(request);

    console.log(`Found ${materializedViews.length} materialized view(s):`);
    for (const materializedView of materializedViews) {
      console.log(`- ${materializedView.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API call failed: ${err.message}`);
    }
  }
}

module.exports = { listMaterializedViews };
// [END bigtable_v2_bigtableinstanceadmin_materializedviews_list]
