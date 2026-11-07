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

// [START pubsub_v1_publisher_topics_list]
'use strict';

const {PublisherClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new PublisherClient();

/**
 * Use the listTopics method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} project - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listTopics(projectId, project) {
  try {
    const parent = `projects/${projectId || project}`;
    const request = {
      project: parent,
    };

    const [topics] = await client.listTopics(request);
    console.log(`Retrieved ${topics.length} topic(s).`);
    for (const topic of topics) {
      console.log(`Topic: ${topic.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Listing topics failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listTopics };
// [END pubsub_v1_publisher_topics_list]
