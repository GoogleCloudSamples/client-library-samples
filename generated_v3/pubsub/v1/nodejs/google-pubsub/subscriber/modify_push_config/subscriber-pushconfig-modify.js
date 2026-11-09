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

// [START pubsub_v1_subscriber_modify_push_config]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Use the modifyPushConfig method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} subId - ID of the Sub (for example, 'example-sub-id')
 */
async function modifyPushConfig(projectId, subId) {
  try {
    const subscription = `projects/${projectId}/subscriptions/${subId}`;
    const pushConfig = {
      pushEndpoint: 'https://example.com/push',
    };

    const request = {
      subscription,
      pushConfig,
    };

    await client.modifyPushConfig(request);
    console.log(`Modified push configuration for subscription: ${subscription}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Subscription not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to modify push config: ${err.message || err}`);
    }
  }
}

module.exports = { modifyPushConfig };
// [END pubsub_v1_subscriber_modify_push_config]
