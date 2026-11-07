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

// [START documentai_v1_documentprocessorservice_processorversions_list]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

/**
 * Lists processor versions for a given processor.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} processorId - ID of the Processor (for example, 'example-processor-id')
 */
async function listProcessorVersions(projectId, locationId, processorId) {
  // Instantiates a client configured for the specific regional endpoint
  const client = new DocumentProcessorServiceClient({
    apiEndpoint: `${locationId}-documentai.googleapis.com`,
  });

  try {
    const parent = client.processorPath(projectId, locationId, processorId);

    const request = {
      parent,
    };

    const [processorVersions] = await client.listProcessorVersions(request);

    console.log(`Found ${processorVersions.length} processor version(s).`);
    for (const version of processorVersions) {
      console.log(`Name: ${version.name}`);
      console.log(`Display Name: ${version.displayName}`);
      console.log(`State: ${version.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The specified processor or location was not found.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided for processor versions request.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for the requested resource.');
    } else {
      console.error('An API error occurred:', err.message);
    }
  }
}

module.exports = { listProcessorVersions };
// [END documentai_v1_documentprocessorservice_processorversions_list]
