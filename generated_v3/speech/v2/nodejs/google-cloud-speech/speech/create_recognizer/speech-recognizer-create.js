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

// [START speech_v2_speech_recognizer_create]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

const client = new SpeechClient();

/**
 * Creates a Speech-to-Text recognizer.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function createRecognizer(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const recognizer = {
      defaultRecognitionConfig: {
        model: 'latest_long',
        languageCodes: ['en-US'],
      },
    };
    const recognizerId = 'speech-recognizer';

    const request = {
      parent,
      recognizerId,
      recognizer,
    };

    const [operation] = await client.createRecognizer(request);
    const [response] = await operation.promise();

    console.log(`Created recognizer: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Recognizer already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = { createRecognizer };
// [END speech_v2_speech_recognizer_create]
