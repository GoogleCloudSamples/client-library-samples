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

// [START pubsub_v1_publisher_detach_subscription]
'use strict';

const {PublisherClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new PublisherClient();

/**
 * Detaches a subscription from its topic.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} subscriptionId - ID of the Subscription (for example, 'example-subscription-id')
 */
async function detachSubscription(projectId, subscriptionId) {
  try {
    const subscription = client.subscriptionPath(projectId, subscriptionId);

    const [response] = await client.detachSubscription({
      subscription,
    });

    console.log(`Detached subscription: ${subscription}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Subscription ${subscriptionId} not found in project ${projectId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while detaching subscription ${subscriptionId}.`);
    } else {
      console.error(`Failed to detach subscription: ${err.message}`);
    }
  }
}

module.exports = { detachSubscription };
// [END pubsub_v1_publisher_detach_subscription]
