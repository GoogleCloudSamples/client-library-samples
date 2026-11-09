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

// [START documentai_v1beta3_documentprocessorservice_processorversion_get]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Use the getProcessorVersion method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the processor (e.g., 'us' or 'eu').
 * @param {string} processorId - The ID of the Document AI processor.
 * @param {string} processorVersionId - The ID of the processor version to retrieve.
 */
async function getProcessorVersion(projectId, locationId, processorId, processorVersionId) {
  try {
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
      console.error(`Permission denied accessing processor version: ${err.message}`);
    } else {
      console.error(`API error retrieving processor version: ${err.message}`);
    }
  }
}

module.exports = { getProcessorVersion };
// [END documentai_v1beta3_documentprocessorservice_processorversion_get]
