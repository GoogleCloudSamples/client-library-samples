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

// [START oracledatabase_v1_oracledatabase_minorversions_list]
'use strict';

const {OracleDatabaseClient} = require('@google-cloud/oracledatabase');
const {status} = require('@grpc/grpc-js');

const client = new OracleDatabaseClient();

/**
 * Use the listMinorVersions method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} giVersionId - The server-defined Oracle Grid Infrastructure (GI) version ID, obtained by listing GI versions (for example, '19').
 */
async function listMinorVersions(projectId, locationId, giVersionId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/giVersions/${giVersionId}`;

    const [minorVersions] = await client.listMinorVersions({
      parent,
    });

    for (const minorVersion of minorVersions) {
      console.log(`Minor version: ${minorVersion.version}`);
      console.log(`Resource name: ${minorVersion.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { listMinorVersions };
// [END oracledatabase_v1_oracledatabase_minorversions_list]
