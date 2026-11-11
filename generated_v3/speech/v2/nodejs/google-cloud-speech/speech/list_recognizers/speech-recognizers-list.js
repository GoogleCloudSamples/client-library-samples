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

// [START speech_v2_speech_recognizers_list]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Lists speech recognizers in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location or region (for example, 'global' or 'us-central1').
 */
async function listRecognizers(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-speech.googleapis.com`;
    }
    const client = new SpeechClient(clientOptions);

    const request = {
      parent,
    };

    const [recognizers] = await client.listRecognizers(request);

    console.log('Recognizers:');
    for (const recognizer of recognizers) {
      console.log(`Name: ${recognizer.name}`);
      if (recognizer.model) {
        console.log(`Model: ${recognizer.model}`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Google API error encountered: ${err.message}`);
    }
  }
}

module.exports = { listRecognizers };
// [END speech_v2_speech_recognizers_list]
