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

// [START documentai_v1beta3_documentprocessorservice_processor_delete]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Use the deleteProcessor method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Document AI location (for example, 'us' or 'eu').
 * @param {string} processorId - The server-generated ID of the processor to delete.
 */
async function deleteProcessor(projectId, locationId, processorId) {
  try {
    // Construct the fully qualified resource name for the processor.
    const name = client.processorPath(projectId, locationId, processorId);

    // DeleteProcessor returns a long-running operation.
    const [operation] = await client.deleteProcessor({name});

    // Wait for the long-running operation to complete.
    await operation.promise();

    console.log(`Processor deleted: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Processor not found: ${projectId}/${locationId}/${processorId}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Processor cannot be deleted: ${err.message}`);
    } else {
      console.error(`Failed to delete processor: ${err.message}`);
    }
  }
}

module.exports = { deleteProcessor };
// [END documentai_v1beta3_documentprocessorservice_processor_delete]
