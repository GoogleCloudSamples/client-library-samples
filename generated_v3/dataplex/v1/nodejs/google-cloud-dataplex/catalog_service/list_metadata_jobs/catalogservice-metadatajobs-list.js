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

// [START dataplex_v1_catalogservice_metadatajobs_list]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Lists metadata jobs in the specified project and location.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 */
async function listMetadataJobs(locationId) {
  try {
    const projectIdOrNumber = await client.getProjectId();
    const parent = `projects/${projectIdOrNumber}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [metadataJobs] = await client.listMetadataJobs(request);

    console.log(`Retrieved ${metadataJobs.length} metadata job(s):`);
    for (const job of metadataJobs) {
      console.log(`Name: ${job.name}`);
      console.log(`Type: ${job.type}`);
      if (job.status) {
        console.log(`State: ${job.status.state}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listMetadataJobs };
// [END dataplex_v1_catalogservice_metadatajobs_list]
