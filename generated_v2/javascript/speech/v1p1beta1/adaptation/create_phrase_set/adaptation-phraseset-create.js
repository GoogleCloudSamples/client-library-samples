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

// [START speech_v1p1beta1_adaptation_phraseset_create]
'use strict';

const {AdaptationClient} = require('@google-cloud/speech').v1p1beta1;
const {status} = require('@grpc/grpc-js');

const client = new AdaptationClient();

/**
 * Use the createPhraseSet method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} phraseSetId - ID of the PhraseSet (for example, 'example-phraseset-id')
 */
async function createPhraseSet(projectId, locationId, phraseSetId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const phraseSet = {
      phrases: [
        {
          value: 'example phrase',
          boost: 10,
        },
      ],
    };

    const request = {
      parent,
      phraseSetId,
      phraseSet,
    };

    const [response] = await client.createPhraseSet(request);
    console.log(`PhraseSet created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`PhraseSet already exists: ${phraseSetId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to create PhraseSet: ${err.message}`);
    }
  }
}

module.exports = { createPhraseSet };
// [END speech_v1p1beta1_adaptation_phraseset_create]
