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

// [START documentai_v1beta3_documentprocessorservice_processortype_get]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Retrieves a processor type from Document AI.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Document AI location (for example, 'us' or 'eu').
 * @param {string} processorTypeId - The processor type identifier (for example, 'OCR_PROCESSOR' or 'FORM_PARSER_PROCESSOR').
 */
async function getProcessorType(projectId, locationId, processorTypeId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/processorTypes/${processorTypeId}`;

    const request = {
      name,
    };

    const [processorType] = await client.getProcessorType(request);

    console.log(`Processor type name: ${processorType.name}`);
    console.log(`Type: ${processorType.type}`);
    console.log(`Category: ${processorType.category}`);
    console.log(`Allow creation: ${processorType.allowCreation}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Processor type not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getProcessorType };
// [END documentai_v1beta3_documentprocessorservice_processortype_get]
