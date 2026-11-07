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

// [START documentai_v1_documentprocessorservice_set_default_processor_version]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Use the setDefaultProcessorVersion method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location where the processor is located (for example, 'us' or 'eu')
 * @param {string} processorId - The server-generated ID of the processor (for example, 'example-processor-id'). Retrieve this value from an existing Processor resource.
 * @param {string} processorVersionId - The server-generated ID of the processor version (for example, 'example-processor-version-id'). Retrieve this value from an existing ProcessorVersion resource.
 */
async function setDefaultProcessorVersion(projectId, locationId, processorId, processorVersionId) {
  try {
    const defaultProcessorVersion = `projects/${projectId}/locations/${locationId}/processors/${processorId}/processorVersions/${processorVersionId}`;
    const processor = `projects/${projectId}/locations/${locationId}/processors/${processorId}`;

    const request = {
      processor,
      defaultProcessorVersion,
    };

    // SetDefaultProcessorVersion initiates a long-running operation.
    const [operation] = await client.setDefaultProcessorVersion(request);
    await operation.promise();

    console.log(`Default processor version set successfully to: ${defaultProcessorVersion}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { setDefaultProcessorVersion };
// [END documentai_v1_documentprocessorservice_set_default_processor_version]
