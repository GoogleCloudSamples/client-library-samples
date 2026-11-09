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

// [START pubsub_v1_publisher_topic_delete]
'use strict';

const {PublisherClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new PublisherClient();

/**
 * Use the deleteTopic method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} topicId - The caller-chosen ID of an existing topic to delete (for example, 'example-topic'). Must start with a letter, contain 3-255 characters (letters, numbers, dashes, underscores, periods, tildes, plus, or percent signs), and not start with 'goog'.
 */
async function deleteTopic(projectId, topicId) {
  try {
    const topic = `projects/${projectId}/topics/${topicId}`;
    const request = {
      topic,
    };

    await client.deleteTopic(request);
    console.log(`Topic deleted: ${topic}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Topic not found: projects/${projectId}/topics/${topicId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete topic: ${err.message}`);
    }
  }
}

module.exports = { deleteTopic };
// [END pubsub_v1_publisher_topic_delete]
