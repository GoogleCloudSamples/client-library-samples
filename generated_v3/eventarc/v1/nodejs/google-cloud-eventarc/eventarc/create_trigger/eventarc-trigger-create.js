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

// [START eventarc_v1_eventarc_trigger_create]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Creates an Eventarc trigger targeting a Cloud Run service.
 *
 * @param {string} triggerId - ID to assign to the trigger (for example, 'example-trigger').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region for the trigger (for example, 'us-central1').
 * @param {string} cloudRunServiceId - The name of the destination Cloud Run service.
 */
async function createTrigger(triggerId, projectId, locationId, cloudRunServiceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const trigger = {
      name: `${parent}/triggers/${triggerId}`,
      eventFilters: [
        {
          attribute: 'type',
          value: 'google.cloud.pubsub.topic.v1.messagePublished',
        },
      ],
      destination: {
        cloudRun: {
          service: cloudRunServiceId,
          region: locationId,
        },
      },
    };

    // CreateTrigger initiates a long-running operation.
    const [operation] = await client.createTrigger({
      parent,
      trigger,
      triggerId,
    });
    const [response] = await operation.promise();

    console.log(`Created trigger: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Trigger ${triggerId} already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create trigger: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createTrigger };
// [END eventarc_v1_eventarc_trigger_create]
