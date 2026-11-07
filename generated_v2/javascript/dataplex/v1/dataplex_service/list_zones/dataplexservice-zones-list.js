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

// [START dataplex_v1_dataplexservice_zones_list]
'use strict';

const {DataplexServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new DataplexServiceClient();

/**
 * Lists the zones in a Dataplex lake.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} lakeId - ID of the Lake (for example, 'example-lake-id')
 */
async function listZones(locationId, lakeId) {
  try {
    const projectNumber = await client.getProjectId();
    const parent = client.lakePath(projectNumber, locationId, lakeId);

    const request = {
      parent,
    };

    const [zones] = await client.listZones(request);
    for (const zone of zones) {
      console.log(`Zone name: ${zone.name}`);
      console.log(`Type: ${zone.type}`);
      console.log(`State: ${zone.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list zones: ${err.message}`);
    }
  }
}

module.exports = { listZones };
// [END dataplex_v1_dataplexservice_zones_list]
