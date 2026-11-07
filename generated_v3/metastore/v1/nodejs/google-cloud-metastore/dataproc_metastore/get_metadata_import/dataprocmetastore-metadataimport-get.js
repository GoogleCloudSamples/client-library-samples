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

// [START metastore_v1_dataprocmetastore_metadataimport_get]
'use strict';

const {DataprocMetastoreClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreClient();

/**
 * Use the getMetadataImport method
 *
 * @param {string} locationId - The Google Cloud region where the Dataproc Metastore service is located.
 * @param {string} serviceId - The ID of the Dataproc Metastore service.
 * @param {string} metadataImportId - The ID of the metadata import.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getMetadataImport(locationId, serviceId, metadataImportId, projectId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/services/${serviceId}/metadataImports/${metadataImportId}`;
    const request = {
      name,
    };

    const [response] = await client.getMetadataImport(request);
    console.log(`Metadata import name: ${response.name}`);
    console.log(`State: ${response.state}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Metadata import was not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { getMetadataImport };
// [END metastore_v1_dataprocmetastore_metadataimport_get]
