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

// [START eventarc_v1_eventarc_channelconnections_list]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Lists Eventarc channel connections in a specific project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location.
 */
async function listChannelConnections(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [channelConnections] = await client.listChannelConnections({
      parent,
    });

    for (const connection of channelConnections) {
      console.log(`Channel connection: ${connection.name}`);
      console.log(`Channel: ${connection.channel}`);
    }

    console.log(`Total channel connections: ${channelConnections.length}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listChannelConnections };
// [END eventarc_v1_eventarc_channelconnections_list]
