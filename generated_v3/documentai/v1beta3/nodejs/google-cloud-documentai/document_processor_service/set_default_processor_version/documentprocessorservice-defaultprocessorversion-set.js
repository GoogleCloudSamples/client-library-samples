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

// [START documentai_v1beta3_documentprocessorservice_set_default_processor_version]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Sets the default processor version for a Document AI processor.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us')
 * @param {string} processorId - Server-generated ID of the processor (for example, 'b26e5794823812c6')
 * @param {string} processorVersionId - Server-generated ID of the processor version (for example, 'rc-1')
 */
async function setDefaultProcessorVersion(projectId, locationId, processorId, processorVersionId) {
  try {
    const processor = `projects/${projectId}/locations/${locationId}/processors/${processorId}`;
    const defaultProcessorVersion = `projects/${projectId}/locations/${locationId}/processors/${processorId}/processorVersions/${processorVersionId}`;

    const request = {
      processor,
      defaultProcessorVersion,
    };

    // SetDefaultProcessorVersion is a long-running operation.
    const [operation] = await client.setDefaultProcessorVersion(request);
    const [response] = await operation.promise();

    console.log('Default processor version set successfully.');
    console.log(`Default processor version: ${response.defaultProcessorVersion}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Processor or processor version not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { setDefaultProcessorVersion };
// [END documentai_v1beta3_documentprocessorservice_set_default_processor_version]
