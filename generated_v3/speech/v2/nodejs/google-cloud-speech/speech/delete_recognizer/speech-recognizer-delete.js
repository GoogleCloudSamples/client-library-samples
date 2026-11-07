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

// [START speech_v2_speech_recognizer_delete]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a Speech-to-Text v2 recognizer.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} recognizerId - ID of the Recognizer (for example, 'example-recognizer-id')
 */
async function deleteRecognizer(projectId, locationId, recognizerId) {
  const client = new SpeechClient({
    apiEndpoint: `${locationId}-speech.googleapis.com`,
  });

  try {
    const name = client.recognizerPath(projectId, locationId, recognizerId);
    const [operation] = await client.deleteRecognizer({
      name,
    });
    await operation.promise();
    console.log(`Deleted recognizer: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Recognizer not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error deleting recognizer: ${err.message}`);
    }
  }
}

module.exports = { deleteRecognizer };
// [END speech_v2_speech_recognizer_delete]
