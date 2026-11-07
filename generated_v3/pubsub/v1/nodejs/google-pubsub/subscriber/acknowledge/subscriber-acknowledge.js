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

// [START pubsub_v1_subscriber_acknowledge]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Acknowledges messages received from a Pub/Sub subscription.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} subscriptionId - The Pub/Sub subscription ID (for example, 'example-subscription').
 * @param {string|string[]} ackIds - The server-generated acknowledgment ID (or list of IDs) returned by the Pub/Sub service.
 */
async function acknowledge(projectId, subscriptionId, ackIds) {
  try {
    const subscription = `projects/${projectId}/subscriptions/${subscriptionId}`;
    const ackIdList = Array.isArray(ackIds) ? ackIds : [ackIds];

    const request = {
      subscription,
      ackIds: ackIdList,
    };

    await client.acknowledge(request);
    console.log(`Acknowledged ${ackIdList.length} message(s) for subscription: ${subscription}`);
  } catch (err) {
    if (typeof err === 'object' && err !== null && 'code' in err) {
      if (err.code === status.NOT_FOUND) {
        console.error(`Subscription not found: ${err.message}`);
        return;
      }
      if (err.code === status.INVALID_ARGUMENT) {
        console.error(`Invalid argument provided: ${err.message}`);
        return;
      }
      console.error(`Pub/Sub API error (${err.code}): ${err.message}`);
      return;
    }
    throw err;
  }
}

module.exports = { acknowledge };
// [END pubsub_v1_subscriber_acknowledge]
