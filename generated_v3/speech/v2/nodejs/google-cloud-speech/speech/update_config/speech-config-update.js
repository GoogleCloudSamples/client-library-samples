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

// [START speech_v2_speech_config_update]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Updates the Cloud Speech-to-Text configuration for a project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} kmsKeyId - The Cloud KMS CryptoKey resource name used to encrypt Speech-to-Text resources at rest, formatted as 'projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}'.
 */
async function updateConfig(projectId, locationId, kmsKeyId) {
  // Speech-to-Text v2 requires regional endpoints for locations other than global.
  const client = new SpeechClient(
    locationId && locationId !== 'global'
      ? {apiEndpoint: `${locationId}-speech.googleapis.com`}
      : {}
  );

  try {
    const config = {
      name: `projects/${projectId}/locations/${locationId}/config`,
      kmsKeyName: kmsKeyId,
    };
    const updateMask = {
      paths: ['kms_key_name'],
    };

    const [response] = await client.updateConfig({
      config,
      updateMask,
    });

    console.log(`Updated configuration: ${response.name}`);
    console.log(`KMS key name: ${response.kmsKeyName}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { updateConfig };
// [END speech_v2_speech_config_update]
