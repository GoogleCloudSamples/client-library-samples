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

// [START speech_v2_speech_customclass_update]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Updates a CustomClass resource in Speech-to-Text v2.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1')
 * @param {string} customClassId - ID of the CustomClass (for example, 'example-custom-class-id')
 */
async function updateCustomClass(projectId, locationId, customClassId) {
  const client = new SpeechClient({
    apiEndpoint:
      locationId === 'global'
        ? 'speech.googleapis.com'
        : `${locationId}-speech.googleapis.com`,
  });

  try {
    const name = client.customClassPath(projectId, locationId, customClassId);
    const customClass = {
      name: name,
      items: [
        {value: 'greeting'},
        {value: 'farewell'},
      ],
    };

    const request = {
      customClass: customClass,
      updateMask: {
        paths: ['items'],
      },
    };

    const [operation] = await client.updateCustomClass(request);
    const [response] = await operation.promise();

    console.log(`Updated CustomClass: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Custom class not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { updateCustomClass };
// [END speech_v2_speech_customclass_update]
