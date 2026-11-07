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

// [START speech_v1_adaptation_customclass_create]
'use strict';

const {AdaptationClient} = require('@google-cloud/speech');
const {status} = require('@grpc/grpc-js');

const client = new AdaptationClient();

/**
 * Use the createCustomClass method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location where the custom class will be created (for example, 'global', 'us', or 'eu')
 * @param {string} customClassId - The caller-specified ID to use for the custom class (for example, 'passenger-class'). Must be 4 to 63 characters, start with a letter, end with a letter or number, and contain only letters, numbers, and hyphens.
 */
async function createCustomClass(projectId, locationId, customClassId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const customClass = {
      items: [
        {value: 'example-phrase-one'},
        {value: 'example-phrase-two'},
      ],
    };

    // Regional endpoints handle non-global location requests
    const adaptationClient =
      locationId && locationId !== 'global'
        ? new AdaptationClient({apiEndpoint: `${locationId}-speech.googleapis.com`})
        : client;

    const request = {
      parent,
      customClassId,
      customClass,
    };

    const [response] = await adaptationClient.createCustomClass(request);
    console.log(`Created custom class: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Custom class already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error creating custom class: ${err.message}`);
    }
  }
}

module.exports = { createCustomClass };
// [END speech_v1_adaptation_customclass_create]
