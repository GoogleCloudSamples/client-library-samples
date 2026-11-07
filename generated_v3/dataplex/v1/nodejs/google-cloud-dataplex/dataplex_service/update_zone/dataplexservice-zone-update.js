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

// [START dataplex_v1_dataplexservice_zone_update]
'use strict';

const {DataplexServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new DataplexServiceClient();

/**
 * Updates a Dataplex zone.
 *
 * @param {object|string} zone - The Dataplex Zone object or zone resource name.
 */
async function updateZone(zone) {
  try {
    const updateMask = {
      paths: ['description'],
    };

    const zoneObj =
      typeof zone === 'string'
        ? {name: zone, description: 'Updated description'}
        : {description: 'Updated description', ...zone};

    const request = {
      zone: zoneObj,
      updateMask,
    };

    const [operation] = await client.updateZone(request);
    const [response] = await operation.promise();
    console.log(`Zone updated successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Zone resource not found:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided for zone update:', err.message);
    } else {
      console.error('Failed to update zone:', err.message);
    }
  }
}

module.exports = {updateZone};
// [END dataplex_v1_dataplexservice_zone_update]
