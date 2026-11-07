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

// [START speech_v1_adaptation_phraseset_create]
'use strict';

const {AdaptationClient} = require('@google-cloud/speech');
const {status} = require('@grpc/grpc-js');

const client = new AdaptationClient();

/**
 * Use the createPhraseSet method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location for the phrase set. Supported locations are 'global', 'us', and 'eu' (for example, 'global').
 * @param {string} phraseSetId - Caller-chosen ID for the phrase set, between 4 and 63 characters, restricting to letters, numbers, and hyphens (for example, 'sample-phrase-set').
 */
async function createPhraseSet(projectId, locationId, phraseSetId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const phraseSet = {
      phrases: [
        {
          value: 'farewell',
          boost: 10,
        },
      ],
      boost: 20,
    };

    // Regional endpoints require routing requests to the designated regional host.
    const adaptationClient =
      locationId && locationId !== 'global'
        ? new AdaptationClient({
            apiEndpoint: `${locationId}-speech.googleapis.com`,
          })
        : client;

    const request = {
      parent,
      phraseSetId,
      phraseSet,
    };

    const [response] = await adaptationClient.createPhraseSet(request);
    console.log(`Created phrase set: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Phrase set already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createPhraseSet };
// [END speech_v1_adaptation_phraseset_create]
