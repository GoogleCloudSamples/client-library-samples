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

// [START migrationcenter_v1_migrationcenter_source_create]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Creates a source in Migration Center.
 *
 * @param {string} sourceId - ID of the Source (for example, 'example-source-id')
 */
async function createSource(sourceId) {
  try {
    const projectId = await client.getProjectId();
    const parent = client.locationPath(projectId, 'us-central1');
    const source = {
      description: 'Source for uploaded asset data',
      type: 'UPLOAD',
    };

    const request = {
      parent,
      sourceId,
      source,
    };

    const [operation] = await client.createSource(request);
    const [response] = await operation.promise();

    console.log(`Source created successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Source already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create source: ${err.message}`);
    }
  }
}

module.exports = { createSource };
// [END migrationcenter_v1_migrationcenter_source_create]
