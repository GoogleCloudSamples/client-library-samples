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

// [START pubsub_v1_publisher_publish]
'use strict';

const {PublisherClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new PublisherClient();

/**
 * Publishes messages to a Cloud Pub/Sub topic using the Publisher client.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} topicId - The ID of the topic to publish messages to (for example, 'example-topic').
 */
async function publish(projectId, topicId) {
  try {
    const topic = `projects/${projectId}/topics/${topicId}`;
    const messages = [
      {
        data: Buffer.from('Example message payload'),
        attributes: {
          origin: 'nodejs-sample',
        },
      },
    ];

    const request = {
      topic,
      messages,
    };

    const [response] = await client.publish(request);
    for (const messageId of response.messageIds) {
      console.log(`Published message ID: ${messageId}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Topic not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`gRPC error (code ${err.code}): ${err.message}`);
    } else {
      console.error(`Error publishing message: ${err.message}`);
    }
  }
}

module.exports = { publish };
// [END pubsub_v1_publisher_publish]
