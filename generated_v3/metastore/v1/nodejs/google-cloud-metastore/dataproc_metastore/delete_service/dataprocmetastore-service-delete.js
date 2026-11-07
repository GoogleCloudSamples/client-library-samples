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

// [START metastore_v1_dataprocmetastore_service_delete]
'use strict';

const {DataprocMetastoreClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreClient();

/**
 * Deletes a Dataproc Metastore service.
 *
 * @param {string} locationId - The Google Cloud region where the metastore service is located (for example, 'us-central1').
 * @param {string} serviceId - The ID of the metastore service to delete (for example, 'example-service').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function deleteService(locationId, serviceId, projectId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/services/${serviceId}`;

    const [operation] = await client.deleteService({name});
    await operation.promise();

    console.log(`Successfully deleted service: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Google API error deleting service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteService };
// [END metastore_v1_dataprocmetastore_service_delete]
