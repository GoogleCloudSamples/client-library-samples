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

// [START oracledatabase_v1_oracledatabase_dbversions_list]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Lists Oracle Database versions available in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listDbVersions(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [dbVersions] = await client.listDbVersions(request);
    for (const dbVersion of dbVersions) {
      console.log(`Version: ${dbVersion.version}`);
      console.log(`Name: ${dbVersion.name}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.log(`Billing account requires a marketplace order: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.log(`Requested resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log(`Permission denied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listDbVersions};
// [END oracledatabase_v1_oracledatabase_dbversions_list]
