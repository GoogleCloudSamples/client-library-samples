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

// [START pubsub_v1_subscriber_subscription_update]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Use the updateSubscription method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} subscriptionId - The ID of the Pub/Sub subscription to update.
 */
async function updateSubscription(projectId, subscriptionId) {
  try {
    const subscription = {
      name: `projects/${projectId}/subscriptions/${subscriptionId}`,
      labels: {
        env: 'test',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    const request = {
      subscription,
      updateMask,
    };

    const [response] = await client.updateSubscription(request);
    console.log(`Updated subscription: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Subscription not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateSubscription };
// [END pubsub_v1_subscriber_subscription_update]
