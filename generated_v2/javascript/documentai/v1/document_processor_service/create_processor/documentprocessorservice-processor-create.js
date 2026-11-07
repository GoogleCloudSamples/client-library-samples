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

// [START documentai_v1_documentprocessorservice_processor_create]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Creates a new Document AI processor.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function createProcessor(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const processor = {
      displayName: 'Form Processor',
      type: 'FORM_PARSER_PROCESSOR',
    };

    const request = {
      parent,
      processor,
    };

    const [response] = await client.createProcessor(request);
    console.log(`Processor created: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    console.log(`Type: ${response.type}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error('Processor already exists in the specified location.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid processor configuration provided.');
    } else {
      console.error(`Failed to create processor: ${err.message}`);
    }
  }
}

module.exports = { createProcessor };
// [END documentai_v1_documentprocessorservice_processor_create]
