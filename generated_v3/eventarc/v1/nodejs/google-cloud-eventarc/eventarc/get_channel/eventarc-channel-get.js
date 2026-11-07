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

// [START eventarc_v1_eventarc_channel_get]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Retrieves an Eventarc channel.
 *
 * @param {string} projectId - The Google Cloud project ID where the channel is located.
 * @param {string} locationId - The Google Cloud region where the channel is located (for example, 'us-central1').
 * @param {string} channelId - The user-provided identifier of the Eventarc channel.
 */
async function getChannel(projectId, locationId, channelId) {
  const name = `projects/${projectId}/locations/${locationId}/channels/${channelId}`;

  try {
    const request = {
      name,
    };

    const [channel] = await client.getChannel(request);

    console.log(`Channel retrieved: ${channel.name}`);
    console.log(`State: ${channel.state}`);
    console.log(`Provider: ${channel.provider}`);

    return channel;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Channel not found at path: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing channel: ${name}`);
    } else if (err.code) {
      console.error(`RPC error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getChannel };
// [END eventarc_v1_eventarc_channel_get]
