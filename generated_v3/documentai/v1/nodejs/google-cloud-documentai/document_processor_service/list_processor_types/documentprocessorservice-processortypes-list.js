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

// [START documentai_v1_documentprocessorservice_processortypes_list]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Use the listProcessorTypes method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listProcessorTypes(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const request = {
      parent,
    };

    const [processorTypes] = await client.listProcessorTypes(request);

    for (const processorType of processorTypes) {
      console.log(`Type: ${processorType.type}`);
      console.log(`Category: ${processorType.category}`);
      console.log(`Allow creation: ${processorType.allowCreation}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Location or project not found.', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for the requested resource.', err.message);
    } else if (err.code !== undefined) {
      console.error(`API request failed with status code ${err.code}:`, err.message);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = { listProcessorTypes };
// [END documentai_v1_documentprocessorservice_processortypes_list]
