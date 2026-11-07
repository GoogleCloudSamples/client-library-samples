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

// [START bigtable_v2_bigtabletableadmin_authorizedview_create]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Creates an authorized view on a Cloud Bigtable table.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - ID of the pre-existing Cloud Bigtable instance (for example, 'example-instance-id').
 * @param {string} tableId - ID of the pre-existing Cloud Bigtable table (for example, 'example-table-id').
 * @param {string} authorizedViewId - Caller-chosen unique ID for the AuthorizedView (for example, 'example-authorized-view-id').
 */
async function createAuthorizedView(projectId, instanceId, tableId, authorizedViewId) {
  try {
    const parent = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;
    const authorizedView = {
      subsetView: {
        rowPrefixes: [Buffer.from('user#')],
      },
    };

    const request = {
      parent,
      authorizedViewId,
      authorizedView,
    };

    // CreateAuthorizedView initiates a long-running operation
    const [operation] = await client.createAuthorizedView(request);
    const [response] = await operation.promise();

    console.log(`Created authorized view: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Authorized view already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { createAuthorizedView };
// [END bigtable_v2_bigtabletableadmin_authorizedview_create]
