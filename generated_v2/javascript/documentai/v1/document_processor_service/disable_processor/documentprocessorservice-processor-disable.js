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

// [START documentai_v1_documentprocessorservice_disable_processor]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Disables a Document AI processor.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us' or 'eu').
 * @param {string} processorId - The server-generated ID of the processor to disable.
 */
async function disableProcessor(projectId, locationId, processorId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/processors/${processorId}`;
    const request = {
      name,
    };

    // DisableProcessor initiates a long-running operation.
    const [operation] = await client.disableProcessor(request);
    await operation.promise();

    console.log(`Processor disabled successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Processor not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Processor cannot be disabled: ${err.message}`);
    } else if (err.code) {
      console.error(`RPC error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Error: ${err.message}`);
    }
  }
}

module.exports = { disableProcessor };
// [END documentai_v1_documentprocessorservice_disable_processor]
