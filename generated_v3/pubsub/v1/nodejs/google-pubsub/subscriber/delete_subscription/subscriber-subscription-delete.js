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

// [START pubsub_v1_subscriber_subscription_delete]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Use the deleteSubscription method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} subId - ID of the Sub (for example, 'example-sub-id')
 */
async function deleteSubscription(projectId, subId) {
  try {
    const subscription = client.subscriptionPath(projectId, subId);
    const request = {
      subscription,
    };

    await client.deleteSubscription(request);
    console.log(`Subscription deleted: ${subscription}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Subscription not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied deleting subscription.');
    } else {
      console.error(`Failed to delete subscription: ${err.message}`);
    }
  }
}

module.exports = { deleteSubscription };
// [END pubsub_v1_subscriber_subscription_delete]
