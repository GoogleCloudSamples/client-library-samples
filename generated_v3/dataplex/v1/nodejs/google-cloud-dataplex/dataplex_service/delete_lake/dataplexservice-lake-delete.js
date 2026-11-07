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

// [START dataplex_v1_dataplexservice_lake_delete]
'use strict';

const {DataplexServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new DataplexServiceClient();

/**
 * Deletes a lake resource in Google Cloud Dataplex.
 *
 * @param {string} locationId - The Google Cloud region location ID (for example, 'us-central1').
 * @param {string} lakeId - The ID of the lake to delete (for example, 'example-lake').
 */
async function deleteLake(locationId, lakeId) {
  const projectNumber = await client.getProjectId();
  const name = client.lakePath(projectNumber, locationId, lakeId);

  try {
    const [operation] = await client.deleteLake({
      name: name,
    });
    await operation.promise();
    console.log(`Deleted lake: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Specified lake does not exist.');
    } else {
      console.error(`Failed to delete lake: ${err.message}`);
    }
  }
}

module.exports = { deleteLake };
// [END dataplex_v1_dataplexservice_lake_delete]
