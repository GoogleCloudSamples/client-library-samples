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

// [START livestream_v1_livestreamservice_channel_get]
'use strict';

const {LivestreamServiceClient} = require('@google-cloud/livestream');
const {status} = require('@grpc/grpc-js');

const client = new LivestreamServiceClient();

/**
 * Retrieves details of a specific channel.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} channelId - The user-defined identifier of the channel to retrieve (for example, 'example-channel-id')
 */
async function getChannel(projectId, locationId, channelId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/channels/${channelId}`;

    const [channel] = await client.getChannel({name});

    console.log(`Channel name: ${channel.name}`);
    console.log(`Channel state: ${channel.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Channel not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getChannel };
// [END livestream_v1_livestreamservice_channel_get]
