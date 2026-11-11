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

// [START speech_v2_speech_undelete_phrase_set]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Undeletes a PhraseSet resource.
 *
 * @param {string} [locationId='global'] - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} phraseSetId - ID of the PhraseSet (for example, 'example-phrase-set-id')
 */
async function undeletePhraseSet(locationId = 'global', projectId, phraseSetId) {
  let resolvedLocation = locationId || 'global';
  let resolvedProject = projectId;
  const resolvedPhraseSet = phraseSetId;

  // Reorder arguments if the project ID was passed as the first parameter.
  const isRegion = /^(us|eu|asia|europe|northamerica|southamerica|australia|me|africa)-[a-z]+[0-9]$/;
  if (resolvedProject === 'global' || isRegion.test(resolvedProject)) {
    const temp = resolvedLocation;
    resolvedLocation = resolvedProject;
    resolvedProject = temp;
  } else if (!resolvedProject && resolvedLocation && resolvedLocation !== 'global' && !isRegion.test(resolvedLocation)) {
    resolvedProject = resolvedLocation;
    resolvedLocation = 'global';
  }

  if (!resolvedProject) {
    resolvedProject = process.env.GOOGLE_CLOUD_PROJECT || process.env.PROJECT_ID;
  }

  const client = new SpeechClient({
    apiEndpoint:
      resolvedLocation && resolvedLocation !== 'global'
        ? `${resolvedLocation}-speech.googleapis.com`
        : undefined,
  });

  try {
    const name = `projects/${resolvedProject}/locations/${resolvedLocation}/phraseSets/${resolvedPhraseSet}`;
    const request = {
      name,
    };

    const [operation] = await client.undeletePhraseSet(request);
    const [response] = await operation.promise();

    console.log(`Undeleted PhraseSet: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`PhraseSet resource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`PhraseSet cannot be undeleted: ${err.message}`);
    } else {
      console.error(`Error undeleting PhraseSet: ${err.message}`);
    }
  }
}

module.exports = {undeletePhraseSet};
// [END speech_v2_speech_undelete_phrase_set]
