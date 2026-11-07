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

// [START documentai_v1beta3_documentprocessorservice_process_document]
'use strict';

const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');
const {status} = require('@grpc/grpc-js');

/**
 * Processes a document using Document AI.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the processor resides (for example, 'us-central1')
 * @param {string} processorId - The processor ID (for example, 'example-processor-id')
 */
async function processDocument(projectId, locationId, processorId) {
  const client = new DocumentProcessorServiceClient({
    apiEndpoint: `${locationId}-documentai.googleapis.com`,
  });

  try {
    const name = client.processorPath(projectId, locationId, processorId);

    // Minimal valid PDF binary buffer for Document AI processing
    const pdfContent = Buffer.from(
      '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000052 00000 n\n0000000101 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n178\n%%EOF'
    );

    const request = {
      name,
      rawDocument: {
        content: pdfContent,
        mimeType: 'application/pdf',
      },
    };

    const [response] = await client.processDocument(request);
    const {document} = response;

    console.log('Processed document successfully.');
    if (document) {
      console.log(`Document text length: ${document.text ? document.text.length : 0}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.details || err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.details || err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.details || err.message);
    } else if (typeof err.code === 'number') {
      console.error(`API Error (${err.code}):`, err.message);
    } else {
      console.error('An unexpected error occurred:', err.message || err);
    }
  }
}

module.exports = { processDocument };
// [END documentai_v1beta3_documentprocessorservice_process_document]
