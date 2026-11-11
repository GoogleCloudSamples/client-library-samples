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

// [START speech_v2_speech_recognizer_update]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Updates an existing recognizer.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} recognizerId - ID of the Recognizer (for example, 'example-recognizer-id')
 */
async function updateRecognizer(projectId, locationId, recognizerId) {
  try {
    const client = new SpeechClient({
      apiEndpoint:
        locationId === 'global'
          ? 'speech.googleapis.com'
          : `${locationId}-speech.googleapis.com`,
    });

    const recognizer = {
      name: `projects/${projectId}/locations/${locationId}/recognizers/${recognizerId}`,
      displayName: 'Updated Recognizer',
      model: 'latest_long',
      languageCodes: ['en-US'],
    };

    const request = {
      recognizer,
      updateMask: {
        paths: ['display_name', 'model', 'language_codes'],
      },
    };

    const [operation] = await client.updateRecognizer(request);
    const [response] = await operation.promise();

    console.log(`Updated recognizer: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Recognizer not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = {updateRecognizer};
// [END speech_v2_speech_recognizer_update]
