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

// [START secretmanager_v1_secretmanagerservice_secret_create]
/**
 * Create Secret with Global Replication.
 *
 * Creates a new secret resource configured for automatic global replication,
 * ensuring high availability across all regions.
 *
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 * @param secretId ID of the secret to create (such as 'my-secret-id')
 */
'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

async function createSecret(projectId, secretId) {
  try {
    const parent = `projects/${projectId}`;

    const [secret] = await client.createSecret({
      parent,
      secretId,
      secret: {
        replication: {
          automatic: {},
        },
      },
    });

    console.log(`Created secret: ${secret.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(
        `Error: The secret '${secretId}' already exists. Use a different secret ID.`,
      );
    } else {
      console.error(`An unexpected error occurred: ${err.message}`);
    }
  }
}

module.exports = {createSecret};
// [END secretmanager_v1_secretmanagerservice_secret_create]
