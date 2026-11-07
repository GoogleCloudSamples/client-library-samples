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

// [START speech_v2_speech_phrasesets_list]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Lists phrase sets in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region or location for the Speech resources (for example, 'global' or 'us-central1').
 */
async function listPhraseSets(projectId, locationId) {
  try {
    const client = new SpeechClient(
      locationId && locationId !== 'global'
        ? {apiEndpoint: `${locationId}-speech.googleapis.com`}
        : {}
    );

    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [phraseSets] = await client.listPhraseSets(request);

    for (const phraseSet of phraseSets) {
      console.log(`Phrase set: ${phraseSet.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = {listPhraseSets};
// [END speech_v2_speech_phrasesets_list]
