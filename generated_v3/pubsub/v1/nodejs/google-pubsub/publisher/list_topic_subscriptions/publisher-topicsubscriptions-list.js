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

// [START pubsub_v1_publisher_topicsubscriptions_list]
'use strict';

const {PublisherClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new PublisherClient();

/**
 * Lists the subscriptions attached to a topic.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} topicId - ID of the Topic (for example, 'example-topic-id')
 */
async function listTopicSubscriptions(projectId, topicId) {
  try {
    const topic = `projects/${projectId}/topics/${topicId}`;
    const request = {
      topic,
    };

    const [subscriptions] = await client.listTopicSubscriptions(request);

    console.log(`Subscriptions for topic ${topic}:`);
    for (const subscription of subscriptions) {
      console.log(subscription);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Topic not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error listing topic subscriptions: ${err.message}`);
    }
  }
}

module.exports = { listTopicSubscriptions };
// [END pubsub_v1_publisher_topicsubscriptions_list]
