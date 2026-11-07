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

// [START bigquerydatatransfer_v1_datatransferservice_enroll_data_sources]
'use strict';

const {DataTransferServiceClient} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Enrolls data sources for a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1' or 'us').
 * @param {string} dataSourceId - The data source identifier to enroll (for example, 'cross_region_copy').
 */
async function enrollDataSources(projectId, locationId, dataSourceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}`;

    const request = {
      name,
      dataSourceIds: [dataSourceId],
    };

    await client.enrollDataSources(request);
    console.log(`Enrolled data source '${dataSourceId}' into '${name}'.`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Failed to enroll data sources: ${err.message}`);
    }
  }
}

module.exports = { enrollDataSources };
// [END bigquerydatatransfer_v1_datatransferservice_enroll_data_sources]
