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

// [START speech_v2_speech_phraseset_delete]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Deletes an existing PhraseSet.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region or 'global' (for example, 'us-central1')
 * @param {string} phraseSetId - The ID of the existing PhraseSet to delete (for example, 'example-phrase-set-id')
 */
async function deletePhraseSet(projectId, locationId, phraseSetId) {
  const client = new SpeechClient(
    locationId && locationId !== 'global'
      ? {apiEndpoint: `${locationId}-speech.googleapis.com`}
      : {}
  );

  try {
    const name = `projects/${projectId}/locations/${locationId}/phraseSets/${phraseSetId}`;

    const [operation] = await client.deletePhraseSet({
      name,
    });
    await operation.promise();

    console.log(`Deleted PhraseSet: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`PhraseSet was not found: ${err.message || err}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Permission denied deleting PhraseSet: ${err.message || err}`
      );
    } else {
      console.error(`Failed to delete PhraseSet: ${err.message || err}`);
    }
  }
}

module.exports = { deletePhraseSet };
// [END speech_v2_speech_phraseset_delete]
