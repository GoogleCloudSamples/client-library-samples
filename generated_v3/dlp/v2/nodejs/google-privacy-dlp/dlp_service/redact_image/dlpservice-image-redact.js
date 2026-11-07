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

// [START dlp_v2_dlpservice_redact_image]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Use the redactImage method
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function redactImage(projectId) {
  try {
    const parent = `projects/${projectId}`;

    // Construct image payload with 1x1 PNG test byte data
    const byteItem = {
      type: 'IMAGE_PNG',
      data: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'base64'
      ),
    };

    // Configure redaction masks for identified sensitive info types
    const imageRedactionConfigs = [
      {
        infoType: {name: 'EMAIL_ADDRESS'},
        redactionColor: {red: 0, green: 0, blue: 0},
      },
    ];

    // Configure info types to scan without specifying finding limits
    const inspectConfig = {
      infoTypes: [{name: 'EMAIL_ADDRESS'}, {name: 'PHONE_NUMBER'}],
      minLikelihood: 'LIKELIHOOD_UNSPECIFIED',
    };

    const request = {
      parent,
      byteItem,
      imageRedactionConfigs,
      inspectConfig,
    };

    const [response] = await client.redactImage(request);

    console.log(`Redacted image size: ${response.redactedImage.length} bytes`);
    if (response.inspectResult && response.inspectResult.findings) {
      console.log(`Identified findings count: ${response.inspectResult.findings.length}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`DLP request failed with error code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { redactImage };
// [END dlp_v2_dlpservice_redact_image]
