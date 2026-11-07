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

// [START speech_v2_speech_customclass_create]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;

const client = new SpeechClient();

/**
 * Creates a custom class for Speech-to-Text v2.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region.
 */
async function createCustomClass(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const customClassId = 'custom-class-1';
    const customClass = {
      items: [
        {value: 'custom phrase 1'},
        {value: 'custom phrase 2'},
      ],
    };

    const request = {
      parent,
      customClass,
      customClassId,
    };

    const [operation] = await client.createCustomClass(request);
    const [response] = await operation.promise();
    console.log(`Custom class created successfully: ${response.name}`);
  } catch (err) {
    if (err.code) {
      console.error(`Google API Error (${err.code}): ${err.message}`);
    } else {
      console.error('Failed to create custom class:', err);
    }
  }
}

module.exports = { createCustomClass };
// [END speech_v2_speech_customclass_create]
