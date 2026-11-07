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

// [START speech_v1p1beta1_adaptation_customclass_create]
'use strict';

const {AdaptationClient} = require('@google-cloud/speech');
const {status} = require('@grpc/grpc-js');

const client = new AdaptationClient();

/**
 * Creates a CustomClass resource for Speech-to-Text adaptation.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the service is located (for example, 'global', 'us', or 'eu').
 * @param {string} customClassId - Caller-chosen identifier for the CustomClass (for example, 'example-custom-class'). Must be 4-63 characters, start with a letter, end with a letter or number, and contain only letters, numbers, and hyphens.
 */
async function createCustomClass(projectId, locationId, customClassId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const customClass = {
      items: [
        {value: 'example-phrase'},
      ],
    };

    const [response] = await client.createCustomClass({
      parent,
      customClassId,
      customClass,
    });

    console.log(`Created custom class: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Custom class already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { createCustomClass };
// [END speech_v1p1beta1_adaptation_customclass_create]
