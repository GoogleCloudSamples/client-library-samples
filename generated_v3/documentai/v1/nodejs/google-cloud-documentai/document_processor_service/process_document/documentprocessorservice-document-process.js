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

// [START documentai_v1_documentprocessorservice_process_document]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

const client = new DocumentProcessorServiceClient();

/**
 * Use the processDocument method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} processorId - The server-generated ID of the processor (for example, '1234567890abcdef'). Read from an existing processor.
 */
async function processDocument(projectId, locationId, processorId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/processors/${processorId}`;
    const rawDocument = {
      content: Buffer.from(
        '%PDF-1.3\n1 0 obj<</Pages 2 0 R>>endobj 2 0 obj<</Kids[3 0 R]/Count 1>>endobj 3 0 obj<</MediaBox[0 0 3 3]>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF'
      ),
      mimeType: 'application/pdf',
    };

    const request = {
      name,
      rawDocument,
    };

    const [response] = await client.processDocument(request);

    console.log('Document processed successfully.');
    if (response.document) {
      console.log(`Document text: ${response.document.text || ''}`);
      console.log(`Page count: ${response.document.pages ? response.document.pages.length : 0}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { processDocument };
// [END documentai_v1_documentprocessorservice_process_document]
