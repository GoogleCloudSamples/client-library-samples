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

// [START migrationcenter_v1_migrationcenter_errorframes_list]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the listErrorFrames method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location/region ID.
 * @param {string} sourceId - The ID of the Migration Center Source.
 */
async function listErrorFrames(projectId, locationId, sourceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/sources/${sourceId}`;

    const request = {
      parent,
    };

    const [errorFrames] = await client.listErrorFrames(request);

    console.log(`Found ${errorFrames.length} error frame(s).`);
    for (const frame of errorFrames) {
      console.log(`Error frame: ${frame.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Access denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error [code ${err.code}]: ${err.message}`);
    }
  }
}

module.exports = { listErrorFrames };
// [END migrationcenter_v1_migrationcenter_errorframes_list]
