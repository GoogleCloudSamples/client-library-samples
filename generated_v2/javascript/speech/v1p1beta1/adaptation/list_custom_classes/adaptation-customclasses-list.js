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

// [START speech_v1p1beta1_adaptation_customclasses_list]
'use strict';

const {AdaptationClient} = require('@google-cloud/speech');
const {status} = require('@grpc/grpc-js');

const client = new AdaptationClient();

/**
 * Lists custom classes in a project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region or location for the resource (for example, 'global', 'us', or 'eu').
 */
async function listCustomClasses(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [customClasses] = await client.listCustomClasses(request);

    for (const customClass of customClasses) {
      console.log(`Custom Class Name: ${customClass.name}`);
      console.log(`Custom Class ID: ${customClass.customClassId}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list custom classes: ${err.message}`);
    }
  }
}

module.exports = { listCustomClasses };
// [END speech_v1p1beta1_adaptation_customclasses_list]
