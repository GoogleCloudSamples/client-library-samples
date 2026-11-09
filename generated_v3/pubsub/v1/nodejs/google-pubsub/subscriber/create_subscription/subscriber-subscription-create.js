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

// [START pubsub_v1_subscriber_subscription_create]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Use the createSubscription method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} subscriptionId - ID of the Subscription (for example, 'example-subscription-id')
 * @param {string} topicId - ID of the Topic (for example, 'example-topic-id')
 */
async function createSubscription(projectId, subscriptionId, topicId) {
  try {
    const topic = `projects/${projectId}/topics/${topicId}`;
    const name = `projects/${projectId}/subscriptions/${subscriptionId}`;

    const request = {
      name,
      topic,
    };

    const [response] = await client.createSubscription(request);
    console.log(`Created subscription: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Subscription already exists: projects/${projectId}/subscriptions/${subscriptionId}`);
    } else {
      console.error(`Failed to create subscription: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { createSubscription };
// [END pubsub_v1_subscriber_subscription_create]
