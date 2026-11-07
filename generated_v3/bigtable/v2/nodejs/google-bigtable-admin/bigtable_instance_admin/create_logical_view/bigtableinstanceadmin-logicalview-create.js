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

// [START bigtable_v2_bigtableinstanceadmin_logicalview_create]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Creates a logical view in a Cloud Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the existing Bigtable instance.
 * @param {string} logicalViewId - The ID to use for the new logical view.
 */
async function createLogicalView(projectId, instanceId, logicalViewId) {
  try {
    const logicalView = {
      query: 'SELECT _key FROM example_table',
    };
    const parent = `projects/${projectId}/instances/${instanceId}`;

    const [operation] = await client.createLogicalView({
      parent,
      logicalViewId,
      logicalView,
    });

    // Logical view creation is a long-running operation.
    const [response] = await operation.promise();
    console.log(`Created logical view: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Logical view already exists: ${logicalViewId}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Operation failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createLogicalView };
// [END bigtable_v2_bigtableinstanceadmin_logicalview_create]
