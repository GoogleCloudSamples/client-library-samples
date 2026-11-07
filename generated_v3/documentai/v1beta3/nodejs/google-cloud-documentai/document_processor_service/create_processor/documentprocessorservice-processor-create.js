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

// [START documentai_v1beta3_documentprocessorservice_processor_create]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

/**
 * Creates a processor in Google Cloud Document AI.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 */
async function createProcessor(projectId, locationId) {
  const client = new DocumentProcessorServiceClient({
    apiEndpoint: `${locationId}-documentai.googleapis.com`,
  });

  try {
    const parent = client.locationPath(projectId, locationId);
    const processor = {
      displayName: `example-processor-${Date.now()}`,
      type: 'OCR_PROCESSOR',
    };

    const request = {
      parent,
      processor,
    };

    const [response] = await client.createProcessor(request);
    console.log(`Processor name: ${response.name}`);
    console.log(`Processor display name: ${response.displayName}`);
    console.log(`Processor type: ${response.type}`);
    console.log(`Processor state: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Processor already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error creating processor: ${err.message}`);
    }
  }
}

module.exports = {createProcessor};
// [END documentai_v1beta3_documentprocessorservice_processor_create]
