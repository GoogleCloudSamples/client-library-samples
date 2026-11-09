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

// [START pubsub_v1_subscriber_modify_ack_deadline]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Modifies the acknowledgment deadline for a subscription message.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} subId - The ID of the subscription (for example, 'example-sub-id')
 */
async function modifyAckDeadline(projectId, subId) {
  try {
    const subscription = `projects/${projectId}/subscriptions/${subId}`;
    const ackDeadlineSeconds = 30;

    let ackIds;
    // Pull with retries to obtain a valid acknowledgment ID.
    for (let attempt = 0; attempt < 10; attempt++) {
      const [pullResponse] = await client.pull({
        subscription,
        maxMessages: 1,
      });

      if (pullResponse.receivedMessages && pullResponse.receivedMessages.length > 0) {
        ackIds = pullResponse.receivedMessages[0].ackId;
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (!ackIds) {
      console.log(`No messages received for subscription: ${subscription}`);
      return;
    }

    const request = {
      subscription,
      ackDeadlineSeconds,
      ackIds: [ackIds],
    };

    await client.modifyAckDeadline(request);
    console.log(`Modified acknowledgment deadline for subscription: ${subscription}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Subscription not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { modifyAckDeadline };
// [END pubsub_v1_subscriber_modify_ack_deadline]
