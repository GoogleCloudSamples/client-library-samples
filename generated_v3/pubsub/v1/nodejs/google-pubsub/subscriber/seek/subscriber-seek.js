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

// [START pubsub_v1_subscriber_seek]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Use the seek method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} subscriptionId - The caller-specified ID of the Pub/Sub subscription to seek.
 * @param {string} snapshotId - The caller-specified ID of the Pub/Sub snapshot to seek to.
 */
async function seek(projectId, subscriptionId, snapshotId) {
  try {
    const subscription = `projects/${projectId}/subscriptions/${subscriptionId}`;
    const snapshot = `projects/${projectId}/snapshots/${snapshotId}`;

    const request = {
      subscription,
      snapshot,
    };

    // Seek the subscription back to the state captured by the snapshot.
    const [response] = await client.seek(request);
    console.log(`Reset subscription ${subscription} to snapshot ${snapshot}.`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Invalid state for seek operation: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error during seek: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { seek };
// [END pubsub_v1_subscriber_seek]
