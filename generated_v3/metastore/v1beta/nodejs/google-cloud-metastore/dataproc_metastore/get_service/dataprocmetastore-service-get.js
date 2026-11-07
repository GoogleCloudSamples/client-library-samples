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

// [START metastore_v1beta_dataprocmetastore_service_get]
'use strict';

const {DataprocMetastoreClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreClient();

/**
 * Retrieves the specified Dataproc Metastore service.
 *
 * @param {string} locationId - The Google Cloud region where the metastore service is located (for example, 'us-central1').
 * @param {string} serviceId - The ID of the metastore service (caller-chosen at creation time).
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getService(locationId, serviceId, projectId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/services/${serviceId}`;
    const request = {
      name,
    };

    const [service] = await client.getService(request);

    console.log(`Metastore service retrieved: ${service.name}`);
    console.log(`Endpoint URI: ${service.endpointUri}`);
    console.log(`State: ${service.state}`);

    return service;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Metastore service not found.');
    } else {
      console.error(`Failed to retrieve metastore service: ${err.message}`);
    }
  }
}

module.exports = { getService };
// [END metastore_v1beta_dataprocmetastore_service_get]
