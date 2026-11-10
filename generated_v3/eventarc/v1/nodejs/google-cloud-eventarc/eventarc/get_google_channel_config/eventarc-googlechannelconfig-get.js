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

// [START eventarc_v1_eventarc_googlechannelconfig_get]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Retrieves the Google channel configuration for a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region for the GoogleChannelConfig (for example, "us-central1").
 */
async function getGoogleChannelConfig(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/googleChannelConfig`;

    const [response] = await client.getGoogleChannelConfig({
      name,
    });

    console.log(`GoogleChannelConfig name: ${response.name}`);
    if (response.cryptoKeyName) {
      console.log(`CryptoKey name: ${response.cryptoKeyName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Google channel configuration not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing configuration: ${err.message}`);
    } else {
      console.error(`API error retrieving configuration: ${err.message}`);
    }
  }
}

module.exports = { getGoogleChannelConfig };
// [END eventarc_v1_eventarc_googlechannelconfig_get]
