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

// [START pubsub_v1_subscriber_snapshot_create]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Use the createSnapshot method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} snapshotId - User-specified identifier for the snapshot to create (for example, 'example-snapshot').
 * @param {string} subscriptionId - Identifier of the existing Pub/Sub subscription to snapshot (for example, 'example-subscription').
 */
async function createSnapshot(projectId, snapshotId, subscriptionId) {
  try {
    const name = `projects/${projectId}/snapshots/${snapshotId}`;
    const subscription = `projects/${projectId}/subscriptions/${subscriptionId}`;

    const request = {
      name,
      subscription,
    };

    const [response] = await client.createSnapshot(request);
    console.log(`Created snapshot: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Snapshot already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Subscription not found: ${err.message}`);
    } else {
      console.error(`Failed to create snapshot: ${err.message}`);
    }
  }
}

module.exports = { createSnapshot };
// [END pubsub_v1_subscriber_snapshot_create]
