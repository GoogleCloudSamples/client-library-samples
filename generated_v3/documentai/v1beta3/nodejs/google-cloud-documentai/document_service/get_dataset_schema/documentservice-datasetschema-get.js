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

// [START documentai_v1beta3_documentservice_datasetschema_get]
'use strict';

const {DocumentServiceClient} = require('@google-cloud/documentai').v1beta3;
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves the dataset schema for a Document AI processor.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the processor resides (for example, 'us' or 'eu').
 * @param {string} processorId - The server-generated ID of the processor (for example, 'example-processor-id').
 */
async function getDatasetSchema(projectId, locationId, processorId) {
  // Construct the regional API endpoint for Document AI.
  const client = new DocumentServiceClient({
    apiEndpoint: `${locationId}-documentai.googleapis.com`,
  });

  const name = `projects/${projectId}/locations/${locationId}/processors/${processorId}/dataset/datasetSchema`;

  const request = {
    name,
  };

  try {
    const [datasetSchema] = await client.getDatasetSchema(request);

    console.log(`Dataset schema name: ${datasetSchema.name}`);
    return datasetSchema;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Dataset schema not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getDatasetSchema };
// [END documentai_v1beta3_documentservice_datasetschema_get]
