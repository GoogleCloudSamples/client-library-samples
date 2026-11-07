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

// [START metastore_v1_dataprocmetastore_service_get]
'use strict';

const {DataprocMetastoreClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreClient();

/**
 * Use the getService method
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} serviceId - The ID of the Dataproc Metastore service (for example, 'example-service-id').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getService(locationId, serviceId, projectId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/services/${serviceId}`;

    const request = {
      name,
    };

    const [response] = await client.getService(request);

    console.log(`Service name: ${response.name}`);
    console.log(`Service state: ${response.state}`);
    console.log(`Endpoint URI: ${response.endpointUri}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The requested Dataproc Metastore service does not exist.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Access denied for the specified Dataproc Metastore service.');
    } else {
      console.error(`Failed to retrieve Dataproc Metastore service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getService };
// [END metastore_v1_dataprocmetastore_service_get]
