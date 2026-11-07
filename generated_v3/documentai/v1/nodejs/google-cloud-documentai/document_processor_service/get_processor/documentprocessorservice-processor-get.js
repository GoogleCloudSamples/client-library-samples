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

// [START documentai_v1_documentprocessorservice_processor_get]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Use the getProcessor method to retrieve details about an existing processor.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Document AI location (for example, 'us' or 'eu').
 * @param {string} processorId - The server-generated ID of the processor to retrieve.
 */
async function getProcessor(projectId, locationId, processorId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/processors/${processorId}`;

    const request = {
      name,
    };

    const [processor] = await client.getProcessor(request);

    console.log(`Processor Name: ${processor.name}`);
    console.log(`Display Name: ${processor.displayName}`);
    console.log(`Processor Type: ${processor.type}`);
    console.log(`State: ${processor.state}`);

    return processor;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Processor not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getProcessor };
// [END documentai_v1_documentprocessorservice_processor_get]
