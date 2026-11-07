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

// [START eventarc_v1_eventarc_googlechannelconfig_update]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Updates the Eventarc Google channel config.
 */
async function updateGoogleChannelConfig() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';

    const googleChannelConfig = {
      name: client.googleChannelConfigPath(projectId, location),
    };

    const request = {
      googleChannelConfig,
    };

    const [response] = await client.updateGoogleChannelConfig(request);
    console.log(`Updated Google channel config: ${response.name}`);
    if (response.cryptoKeyName) {
      console.log(`Configured encryption key: ${response.cryptoKeyName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Google channel config not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to update Google channel config: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateGoogleChannelConfig };
// [END eventarc_v1_eventarc_googlechannelconfig_update]
