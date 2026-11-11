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

// [START datastore_v1_datastoreadmin_export_entities]
'use strict';

const {DatastoreAdminClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreAdminClient();

/**
 * Use the exportEntities method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} outputUrlPrefix - The Google Cloud Storage URL prefix to export entities to (for example, 'gs://example-bucket' or 'gs://example-bucket/export-prefix').
 */
async function exportEntities(projectId, outputUrlPrefix) {
  try {
    const request = {
      projectId,
      outputUrlPrefix,
    };

    // ExportEntities initiates a long-running operation.
    const [operation] = await client.exportEntities(request);
    console.log(`Export operation initiated: ${operation.name}`);

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();
    console.log(`Entities successfully exported to: ${response.outputUrl}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation failed precondition: ${err.message}`);
    } else {
      console.error(`Export operation encountered an error: ${err.message}`);
    }
  }
}

module.exports = { exportEntities };
// [END datastore_v1_datastoreadmin_export_entities]
