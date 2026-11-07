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

// [START documentai_v1_documentprocessorservice_processors_list]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

/**
 * Lists Document AI processors in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (for example, 'us-central1')
 */
async function listProcessors(projectId, locationId) {
  const client = new DocumentProcessorServiceClient({
    apiEndpoint: `${locationId}-documentai.googleapis.com`,
  });

  try {
    const parent = client.locationPath(projectId, locationId);
    const request = {
      parent,
    };

    const [processors] = await client.listProcessors(request);

    if (processors.length === 0) {
      console.log('No processors found.');
      return;
    }

    for (const processor of processors) {
      console.log(`Processor Name: ${processor.name}`);
      console.log(`Processor Type: ${processor.type}`);
      console.log(`Display Name: ${processor.displayName}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided for listing processors:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Specified location or project was not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Insufficient permissions to list processors:', err.message);
    } else {
      console.error('An error occurred while listing processors:', err);
    }
  }
}

module.exports = { listProcessors };
// [END documentai_v1_documentprocessorservice_processors_list]
