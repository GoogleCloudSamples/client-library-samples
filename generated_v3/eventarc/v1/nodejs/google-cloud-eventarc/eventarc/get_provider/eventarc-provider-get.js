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

// [START eventarc_v1_eventarc_provider_get]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Use the getProvider method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID (e.g., 'global' or a supported Google Cloud region).
 * @param {string} providerId - The identifier of the Eventarc provider (e.g., 'storage.googleapis.com'). This is server-defined; retrieve it from a ListProviders response or specify a known Google Cloud provider.
 */
async function getProvider(projectId, locationId, providerId) {
  const name = `projects/${projectId}/locations/${locationId}/providers/${providerId}`;

  try {
    const [provider] = await client.getProvider({name});

    console.log(`Provider name: ${provider.name}`);
    console.log(`Display name: ${provider.displayName}`);

    return provider;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Provider not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing provider: ${name}`);
    } else {
      console.error(`API error retrieving provider: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getProvider };
// [END eventarc_v1_eventarc_provider_get]
