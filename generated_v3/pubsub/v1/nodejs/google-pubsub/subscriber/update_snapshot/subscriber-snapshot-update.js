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

// [START pubsub_v1_subscriber_snapshot_update]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Use the updateSnapshot method
 *
 * @param {string} projectId - The Google Cloud project ID containing the snapshot.
 * @param {string} snapshotId - The ID of the Pub/Sub snapshot to update.
 */
async function updateSnapshot(projectId, snapshotId) {
  try {
    const snapshot = {
      name: `projects/${projectId}/snapshots/${snapshotId}`,
      labels: {
        env: 'dev',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    const request = {
      snapshot,
      updateMask,
    };

    const [response] = await client.updateSnapshot(request);
    console.log(`Updated snapshot: ${response.name}`);
    console.log(`Snapshot labels: ${JSON.stringify(response.labels)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Snapshot not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update snapshot: ${err.message}`);
    }
  }
}

module.exports = { updateSnapshot };
// [END pubsub_v1_subscriber_snapshot_update]
