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

// [START speech_v2_speech_recognizer_get]
'use strict';

const {v2} = require('@google-cloud/speech');
const {status} = require('@grpc/grpc-js');

const client = new v2.SpeechClient();

/**
 * Retrieves an existing Recognizer resource.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Google Cloud location where the Recognizer is located.
 * @param {string} recognizerId - Identifier of the Recognizer to retrieve.
 */
async function getRecognizer(projectId, locationId, recognizerId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/recognizers/${recognizerId}`;

    const [recognizer] = await client.getRecognizer({name});

    console.log(`Recognizer name: ${recognizer.name}`);
    console.log(`Recognizer display name: ${recognizer.displayName}`);
    console.log(`Recognizer model: ${recognizer.model}`);

    return recognizer;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Recognizer resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing recognizer: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getRecognizer };
// [END speech_v2_speech_recognizer_get]
