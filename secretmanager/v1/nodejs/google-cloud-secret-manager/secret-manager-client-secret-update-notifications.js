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

// [START secretmanager_v1_secretmanagerservice_secret_update_notifications_with_topics]

'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

/**
 * Update Secret with Pub/Sub Notifications.
 *
 * Updates an existing secret resource to include or modify Pub/Sub
 * notifications. This demonstrates how to configure event notifications for a
 * secret.
 *
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 * @param secretId ID of the secret to update (such as 'my-secret-id')
 * @param topicId ID of the Pub/Sub topic (such as 'my-topic-id')
 */
async function updateSecretWithNotifications(projectId, secretId, topicId) {
  const name = `projects/${projectId}/secrets/${secretId}`;
  const topicName = `projects/${projectId}/topics/${topicId}`;

  try {
    const [updatedSecret] = await client.updateSecret({
      secret: {
        name,
        topics: [
          {
            name: topicName,
          },
        ],
      },
      updateMask: {
        paths: ['topics'],
      },
    });

    console.log(`Updated secret: ${updatedSecret.name}`);
    for (const topic of updatedSecret.topics) {
      console.log(`  Topic: ${topic.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Secret '${name}' not found. Verify the secret exists before updating.`,
      );
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = {updateSecretWithNotifications};
// [END secretmanager_v1_secretmanagerservice_secret_update_notifications_with_topics]
