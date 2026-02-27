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

// [START secretmanager_v1_secretmanagerservice_secret_update]
/**
 * Update Secret Metadata.
 *
 * Updates metadata for an existing secret, demonstrating how to modify
 * properties such as its labels.
 *
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 * @param secretId ID of the secret to update (such as 'my-secret-id')
 */
'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

async function updateSecret(projectId, secretId) {
  const name = `projects/${projectId}/secrets/${secretId}`;

  try {
    const [updatedSecret] = await client.updateSecret({
      secret: {
        name,
        labels: {
          purpose: 'demo',
          environment: 'staging',
        },
      },
      updateMask: {
        paths: ['labels'],
      },
    });

    console.log(`Updated secret: ${updatedSecret.name}`);
    console.log(`  Labels: ${JSON.stringify(updatedSecret.labels)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The secret '${name}' was not found. Verify the secret exists before the update occurs.`,
      );
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = {updateSecret};
// [END secretmanager_v1_secretmanagerservice_secret_update]
