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

// [START speech_v2_speech_customclass_get]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

const client = new SpeechClient();

/**
 * Retrieves an existing CustomClass resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} customClassId - The ID of the CustomClass to retrieve (for example, 'example-custom-class')
 */
async function getCustomClass(projectId, locationId, customClassId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/customClasses/${customClassId}`;

    const request = {
      name,
    };

    const [customClass] = await client.getCustomClass(request);

    console.log(`CustomClass retrieved: ${customClass.name}`);
    return customClass;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CustomClass resource not found: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (status code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getCustomClass };
// [END speech_v2_speech_customclass_get]
