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

// [START translate_v3beta1_translationservice_translate_document]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Translates a document from input bytes into a target language.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 */
async function translateDocument(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    // Minimal valid PDF containing a text stream for translation processing
    const samplePdfContent = [
      '%PDF-1.4',
      '1 0 obj',
      '<< /Type /Catalog /Pages 2 0 R >>',
      'endobj',
      '2 0 obj',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      'endobj',
      '3 0 obj',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
      'endobj',
      '4 0 obj',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
      'endobj',
      '5 0 obj',
      '<< /Length 44 >>',
      'stream',
      'BT',
      '/F1 12 Tf',
      '100 700 Td',
      '(Hello, world!) Tj',
      'ET',
      'endstream',
      'endobj',
      'xref',
      '0 6',
      '0000000000 65535 f ',
      '0000000009 00000 n ',
      '0000000058 00000 n ',
      '0000000115 00000 n ',
      '0000000236 00000 n ',
      '0000000305 00000 n ',
      'trailer',
      '<< /Size 6 /Root 1 0 R >>',
      'startxref',
      '398',
      '%%EOF',
    ].join('\n');

    const documentInputConfig = {
      content: Buffer.from(samplePdfContent),
      mimeType: 'application/pdf',
    };

    const targetLanguageCode = 'es';

    const request = {
      parent,
      documentInputConfig,
      targetLanguageCode,
    };

    const [response] = await client.translateDocument(request);

    console.log(`Translated document MIME type: ${response.documentTranslation.mimeType}`);
    console.log(`Detected source language code: ${response.documentTranslation.detectedLanguageCode}`);
  } catch (err) {
    if (err.code !== undefined && Object.values(status).includes(err.code)) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { translateDocument };
// [END translate_v3beta1_translationservice_translate_document]
