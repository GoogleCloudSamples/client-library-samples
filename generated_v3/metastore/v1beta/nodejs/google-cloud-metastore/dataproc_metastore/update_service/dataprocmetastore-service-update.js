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

// [START metastore_v1beta_dataprocmetastore_service_update]
'use strict';

const {DataprocMetastoreClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreClient();

/**
 * Use the updateService method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, us-central1).
 * @param {string} serviceId - The ID of the Dataproc Metastore service.
 */
async function updateService(projectId, locationId, serviceId) {
  try {
    const service = {
      name: `projects/${projectId}/locations/${locationId}/services/${serviceId}`,
      labels: {
        env: 'test',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    const [operation] = await client.updateService({
      service,
      updateMask,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();
    console.log(`Service updated successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateService };
// [END metastore_v1beta_dataprocmetastore_service_update]
