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

'use strict';

// [START secretmanager_v1_secretmanagerservice_secretversion_add]
// [START secretmanager_secretmanagerservice_secretversion_add]
// [START secretmanager_add_secret_version]

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

/**
 * Adds a new version to an existing secret.
 * This demonstrates how to rotate or update secret values, which is essential for reconfiguring service parameters and maintaining robust security.
 *
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 * @param secretId ID of the secret (such as 'my-secret-id')
 */
async function addSecretVersion(projectId, secretId) {
  const parent = `projects/${projectId}/secrets/${secretId}`;
  const payloadData = 'my super-secret data';

  try {
    const [version] = await client.addSecretVersion({
      parent,
      payload: {
        data: Buffer.from(payloadData, 'utf8'),
      },
    });

    const dateObj = new Date(Number(version.createTime.seconds) * 1000);

    const createTime = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'long',
      timeZone: 'GMT',
    }).format(dateObj);

    console.log(`Added secret version: ${version.name}`);
    console.log(`  Create Time: ${createTime}`);
    console.log(`  State: ${version.state}`);
    console.log(`  Replication: ${version.replicationStatus.replicationStatus}`);

  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The secret '${secretId}' was not found. Verify the secret exists before adding a version.`,
      );
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

// [END secretmanager_add_secret_version]
// [END secretmanager_secretmanagerservice_secretversion_add]
// [END secretmanager_v1_secretmanagerservice_secretversion_add]

module.exports = {addSecretVersion};
