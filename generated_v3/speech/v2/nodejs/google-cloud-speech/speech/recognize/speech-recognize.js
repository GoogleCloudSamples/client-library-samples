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

// [START speech_v2_speech_recognize]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Transcribes speech audio using Speech-to-Text V2.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} recognizerId - ID of the Recognizer (for example, 'example-recognizer-id')
 */
async function recognize(projectId, locationId, recognizerId) {
  try {
    const client = new SpeechClient({
      apiEndpoint: `${locationId}-speech.googleapis.com`,
    });

    const recognizer = `projects/${projectId}/locations/${locationId}/recognizers/${recognizerId}`;

    const request = {
      recognizer,
      config: {
        autoDecodingConfig: {},
        model: 'long',
        languageCodes: ['en-US'],
      },
      uri: 'gs://cloud-samples-data/speech/brooklyn_bridge.wav',
    };

    const [response] = await client.recognize(request);

    if (response.results) {
      for (const result of response.results) {
        if (result.alternatives) {
          for (const alternative of result.alternatives) {
            console.log(`Transcript: ${alternative.transcript}`);
            console.log(`Confidence: ${alternative.confidence}`);
          }
        }
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Recognizer resource not found:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for operation:', err.message);
    } else {
      console.error('Speech recognition request failed:', err.message || err);
    }
  }
}

module.exports = { recognize };
// [END speech_v2_speech_recognize]
