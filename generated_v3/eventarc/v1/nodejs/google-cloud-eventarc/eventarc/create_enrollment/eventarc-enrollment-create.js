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

// [START eventarc_v1_eventarc_enrollment_create]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Creates an Eventarc enrollment.
 *
 * @param {string} enrollmentId - Caller-chosen ID to assign to the Enrollment. Must match '^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$' (for example, 'example-enrollment').
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project').
 * @param {string} locationId - Google Cloud location or region (for example, 'us-central1').
 * @param {string} messageBusId - Resource ID of the prerequisite MessageBus to subscribe to (for example, 'example-message-bus'). Sourced from an existing MessageBus.
 */
async function createEnrollment(enrollmentId, projectId, locationId, messageBusId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const enrollment = {
      celMatch: 'message.type == "google.cloud.pubsub.topic.v1.messagePublished"',
      messageBus: `projects/${projectId}/locations/${locationId}/messageBuses/${messageBusId}`,
      destination: `projects/${projectId}/locations/${locationId}/pipelines/example-pipeline`,
    };

    const [operation] = await client.createEnrollment({
      parent,
      enrollment,
      enrollmentId,
    });
    const [response] = await operation.promise();

    console.log(`Created enrollment: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Enrollment already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createEnrollment };
// [END eventarc_v1_eventarc_enrollment_create]
