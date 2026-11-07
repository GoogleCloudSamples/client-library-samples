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

// [START eventarcpublishing_v1_publisher_publish_events]
'use strict';

const {PublisherClient} = require('@google-cloud/eventarc-publishing');
const {status} = require('@grpc/grpc-js');

const client = new PublisherClient();

/**
 * Use the publishEvents method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region of the Eventarc channel.
 * @param {string} channelId - The ID of the Eventarc channel to publish events to.
 */
async function publishEvents(projectId, locationId, channelId) {
  try {
    const channel = `projects/${projectId}/locations/${locationId}/channels/${channelId}`;
    const textEvents = [
      JSON.stringify({
        specversion: '1.0',
        type: 'example.event.type',
        source: 'example-event-source',
        id: 'example-event-id',
        data: {
          message: 'Hello from Eventarc!',
        },
      }),
    ];

    const request = {
      channel,
      textEvents,
    };

    const [response] = await client.publishEvents(request);
    console.log(`Events published to ${channel}:`, response);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Channel resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Access denied to Eventarc channel: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid payload or channel specification: ${err.message}`);
    } else {
      console.error(`Publishing failed with gRPC error: ${err.message || err}`);
    }
  }
}

module.exports = { publishEvents };
// [END eventarcpublishing_v1_publisher_publish_events]
