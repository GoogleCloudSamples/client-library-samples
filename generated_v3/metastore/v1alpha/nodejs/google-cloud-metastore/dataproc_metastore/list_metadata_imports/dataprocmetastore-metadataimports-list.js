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

// [START metastore_v1alpha_dataprocmetastore_metadataimports_list]
'use strict';

const {DataprocMetastoreClient} = require('@google-cloud/dataproc-metastore');
const {status} = require('@grpc/grpc-js');

const client = new DataprocMetastoreClient();

/**
 * Lists metadata imports in a Dataproc Metastore service.
 *
 * @param {string} locationId - The Google Cloud region where the Dataproc Metastore service is located (for example, 'us-central1').
 * @param {string} serviceId - The ID of the Dataproc Metastore service whose metadata imports to list.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listMetadataImports(locationId, serviceId, projectId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/services/${serviceId}`;

    const request = {
      parent,
    };

    const [metadataImports] = await client.listMetadataImports(request);
    console.log(`Listed ${metadataImports.length} metadata import(s):`);
    for (const metadataImport of metadataImports) {
      console.log(`- Name: ${metadataImport.name}`);
      console.log(`  State: ${metadataImport.state}`);
    }
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Google API Error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listMetadataImports };
// [END metastore_v1alpha_dataprocmetastore_metadataimports_list]
