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

// [START alloydb_v1beta_alloydbadmin_supporteddatabaseflags_list]
'use strict';

const {AlloyDBAdminClient} = require('@google-cloud/alloydb');
const {status} = require('@grpc/grpc-js');

const client = new AlloyDBAdminClient();

/**
 * Use the listSupportedDatabaseFlags method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listSupportedDatabaseFlags(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const request = {
      parent,
    };

    const [response] = await client.listSupportedDatabaseFlags(request);
    for (const flag of response) {
      console.log(`Flag Name: ${flag.name}`);
      console.log(`Flag String ID: ${flag.stringId}`);
      console.log(`Value Type: ${flag.valueType}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Location not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else {
      console.error('Error listing supported database flags:', err);
    }
  }
}

module.exports = { listSupportedDatabaseFlags };
// [END alloydb_v1beta_alloydbadmin_supporteddatabaseflags_list]
