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

// [START pubsub_v1_publisher_topicsnapshots_list]
'use strict';

const {PublisherClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new PublisherClient();

/**
 * Lists the snapshots attached to the specified Pub/Sub topic.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} topicId - The caller-chosen ID of the Pub/Sub topic (for example, 'example-topic-id').
 */
async function listTopicSnapshots(projectId, topicId) {
  try {
    const topic = `projects/${projectId}/topics/${topicId}`;
    const [snapshots] = await client.listTopicSnapshots({topic});

    console.log(`Snapshots for topic ${topic}:`);
    for (const snapshot of snapshots) {
      console.log(`- ${snapshot}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Topic not found: projects/${projectId}/topics/${topicId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing topic: projects/${projectId}/topics/${topicId}`);
    } else {
      console.error(`Error listing snapshots: ${err.message}`);
    }
  }
}

module.exports = { listTopicSnapshots };
// [END pubsub_v1_publisher_topicsnapshots_list]
