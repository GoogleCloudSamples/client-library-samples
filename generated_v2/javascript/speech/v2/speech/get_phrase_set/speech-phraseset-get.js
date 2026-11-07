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

// [START speech_v2_speech_phraseset_get]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

const client = new SpeechClient();

/**
 * Use the getPhraseSet method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} phraseSetId - ID of the PhraseSet (for example, 'example-phraseset-id')
 */
async function getPhraseSet(projectId, locationId, phraseSetId) {
  try {
    const name = client.phraseSetPath(projectId, locationId, phraseSetId);

    const [phraseSet] = await client.getPhraseSet({
      name,
    });

    console.log(`PhraseSet Name: ${phraseSet.name}`);
    console.log(`Phrases count: ${phraseSet.phrases ? phraseSet.phrases.length : 0}`);
    return phraseSet;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`PhraseSet not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing PhraseSet: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error retrieving PhraseSet: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPhraseSet };
// [END speech_v2_speech_phraseset_get]
