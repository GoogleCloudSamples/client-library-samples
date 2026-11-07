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

// [START speech_v2_speech_phraseset_create]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Creates a phrase set to improve speech recognition accuracy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function createPhraseSet(projectId, locationId) {
  try {
    const apiEndpoint =
      locationId === 'global'
        ? 'speech.googleapis.com'
        : `${locationId}-speech.googleapis.com`;
    const client = new SpeechClient({apiEndpoint});

    const parent = `projects/${projectId}/locations/${locationId}`;
    const phraseSet = {
      phrases: [
        {value: 'Google Cloud Platform', boost: 10},
        {value: 'Speech-to-Text API', boost: 5},
      ],
    };
    const phraseSetId = 'phrase-set-1';

    const request = {
      parent,
      phraseSetId,
      phraseSet,
    };

    const [operation] = await client.createPhraseSet(request);
    const [response] = await operation.promise();

    console.log(`Created phrase set: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Phrase set already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`RPC failed with status code ${err.code}: ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

module.exports = {createPhraseSet};
// [END speech_v2_speech_phraseset_create]
