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

// [START datastore_v1_datastoreadmin_import_entities]
'use strict';

const {DatastoreAdminClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreAdminClient();

/**
 * Use the importEntities method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} inputUrl - The full Cloud Storage resource URL of the export metadata file (for example, 'gs://my-bucket/export-dir/export.overall_export_metadata').
 */
async function importEntities(projectId, inputUrl) {
  try {
    const request = {
      projectId,
      inputUrl,
    };

    // Start the import operation
    const [operation] = await client.importEntities(request);
    console.log(`Import operation started: ${operation.name}`);

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();
    console.log(`Entities imported successfully from ${inputUrl}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { importEntities };
// [END datastore_v1_datastoreadmin_import_entities]
