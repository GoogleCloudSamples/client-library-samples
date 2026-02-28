/**
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START secretmanager_v1_secretmanagerservice_secret_create_notifications_with_topics]

'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

/**
 * Create Secret with Pub/Sub Notifications.
 *
 * Creates a new secret resource configured with Pub/Sub notifications. This
 * sample demonstrates how to publish notifications when secret versions are
 * added or destroyed.
 *
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 * @param secretId ID of the secret to create (such as 'my-secret-id')
 * @param topicId ID of the Pub/Sub topic (such as 'my-topic-id')
 */
async function createSecretWithNotifications(projectId, secretId, topicId) {
  const parent = `projects/${projectId}`;

  try {
    const [secret] = await client.createSecret({
      parent,
      secretId,
      secret: {
        replication: {
          automatic: {},
        },
        topics: [
          {
            name: `projects/${projectId}/topics/${topicId}`,
          },
        ],
      },
    });

    console.log(`Created secret: ${secret.name}`);
    for (const topic of secret.topics) {
      console.log(`  Topic: ${topic.name}`);
    }
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(
        `Error: The secret '${secretId}' already exists. Use a different secret ID.`,
      );
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

// [END secretmanager_v1_secretmanagerservice_secret_create_notifications_with_topics]

module.exports = {createSecretWithNotifications};
