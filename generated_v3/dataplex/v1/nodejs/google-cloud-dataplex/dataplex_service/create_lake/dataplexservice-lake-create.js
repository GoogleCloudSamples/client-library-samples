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

// [START dataplex_v1_dataplexservice_lake_create]
'use strict';

const {DataplexServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new DataplexServiceClient();

/**
 * Creates a Dataplex lake in the specified project and location.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} lakeId - ID of the Lake (for example, 'example-lake-id')
 */
async function createLake(locationId, lakeId) {
  try {
    // Dynamically retrieve the project ID from the authenticated client environment
    const projectNumber = await client.getProjectId();

    // Support either argument order in case parameters are passed as (lakeId, locationId)
    let resolvedLocationId = locationId;
    let resolvedLakeId = lakeId;
    if (
      /^(?:us|europe|asia|australia|northamerica|southamerica|me|africa)-[a-z]+[0-9]$/.test(lakeId) &&
      !/^(?:us|europe|asia|australia|northamerica|southamerica|me|africa)-[a-z]+[0-9]$/.test(locationId)
    ) {
      resolvedLocationId = lakeId;
      resolvedLakeId = locationId;
    }

    const parent = `projects/${projectNumber}/locations/${resolvedLocationId}`;
    const lake = {
      displayName: 'Example Lake',
      description: 'Dataplex lake for organizing structured and unstructured data assets',
    };

    const request = {
      parent,
      lakeId: resolvedLakeId,
      lake,
    };

    // Wait for the lake creation operation to complete
    const [operation] = await client.createLake(request);
    const [response] = await operation.promise();

    console.log(`Created lake: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Lake already exists: ${lakeId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied creating lake: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create lake: ${err.message}`);
    }
  }
}

module.exports = { createLake };
// [END dataplex_v1_dataplexservice_lake_create]
