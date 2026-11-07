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

// [START documentai_v1_documentprocessorservice_processorversion_get]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Retrieves details of a specific Document AI processor version.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the processor (for example, 'us' or 'eu').
 * @param {string} processorId - The server-generated ID of the processor.
 * @param {string} processorVersionId - The ID or alias of the processor version (for example, 'pretrained-foundation-model-v1.0' or 'rc').
 */
async function getProcessorVersion(projectId, locationId, processorId, processorVersionId) {
  try {
    // Construct the processor version resource name.
    const name = `projects/${projectId}/locations/${locationId}/processors/${processorId}/processorVersions/${processorVersionId}`;

    const request = {
      name,
    };

    const [processorVersion] = await client.getProcessorVersion(request);

    console.log(`Processor version name: ${processorVersion.name}`);
    console.log(`Display name: ${processorVersion.displayName}`);
    console.log(`State: ${processorVersion.state}`);

    return processorVersion;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Processor version not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`RPC failed with error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getProcessorVersion };
// [END documentai_v1_documentprocessorservice_processorversion_get]
