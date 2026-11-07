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

// [START pubsub_v1_subscriber_subscription_get]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Use the getSubscription method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} subscriptionId - The ID of the subscription (for example, 'example-subscription'). This is caller-chosen or server-generated when the subscription is created; provide the ID of an existing subscription.
 */
async function getSubscription(projectId, subscriptionId) {
  try {
    const subscription = `projects/${projectId}/subscriptions/${subscriptionId}`;
    const request = {
      subscription,
    };

    const [response] = await client.getSubscription(request);

    console.log(`Subscription: ${response.name}`);
    console.log(`Topic: ${response.topic}`);
    console.log(`Ack deadline: ${response.ackDeadlineSeconds} seconds`);

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Subscription not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Google API error (${err.code}): ${err.message}`);
    }
  }
}

module.exports = { getSubscription };
// [END pubsub_v1_subscriber_subscription_get]
