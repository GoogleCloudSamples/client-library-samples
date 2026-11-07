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

// [START pubsub_v1_subscriber_snapshots_list]
'use strict';

const {SubscriberClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SubscriberClient();

/**
 * Use the listSnapshots method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} project - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listSnapshots(projectId, project) {
  try {
    const parent = client.projectPath(projectId || project);
    const request = {
      project: parent,
    };

    const [snapshots] = await client.listSnapshots(request);
    for (const snapshot of snapshots) {
      console.log(`Snapshot: ${snapshot.name}`);
      console.log(`Topic: ${snapshot.topic}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list snapshots: ${err.message}`);
    }
  }
}

module.exports = { listSnapshots };
// [END pubsub_v1_subscriber_snapshots_list]
