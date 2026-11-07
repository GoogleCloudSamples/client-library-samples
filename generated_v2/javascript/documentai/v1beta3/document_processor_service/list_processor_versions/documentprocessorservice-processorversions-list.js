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

// [START documentai_v1beta3_documentprocessorservice_processorversions_list]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Use the listProcessorVersions method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location where the processor is located (for example, 'us' or 'eu').
 * @param {string} processorId - The server-generated ID of the processor (for example, '1234567890abcdef'). Read from an existing Processor resource.
 */
async function listProcessorVersions(projectId, locationId, processorId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/processors/${processorId}`;

    const request = {
      parent,
    };

    const [processorVersions] = await client.listProcessorVersions(request);

    if (!processorVersions || processorVersions.length === 0) {
      console.log('No processor versions found.');
      return;
    }

    console.log('Processor versions:');
    for (const version of processorVersions) {
      console.log(`- Name: ${version.name}`);
      console.log(`  Display Name: ${version.displayName}`);
      console.log(`  State: ${version.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Processor not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list processor versions: ${err.message}`);
    }
  }
}

module.exports = { listProcessorVersions };
// [END documentai_v1beta3_documentprocessorservice_processorversions_list]
