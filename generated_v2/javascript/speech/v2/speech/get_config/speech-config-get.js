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

// [START speech_v2_speech_config_get]
'use strict';

const {SpeechClient} = require('@google-cloud/speech').v2;
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves the Speech-to-Text configuration for a specific project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function getConfig(projectId, locationId) {
  const apiEndpoint =
    locationId === 'global'
      ? 'speech.googleapis.com'
      : `${locationId}-speech.googleapis.com`;

  const client = new SpeechClient({apiEndpoint});

  try {
    const name = `projects/${projectId}/locations/${locationId}/config`;

    const request = {
      name,
    };

    const [response] = await client.getConfig(request);
    console.log(`Config name: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Config not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve config: ${err.message}`);
    }
  }
}

module.exports = {getConfig};
// [END speech_v2_speech_config_get]
