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

// [START secretmanager_v1_secretmanagerservice_secret_get]
/**
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 * @param secretId ID of the secret to retrieve (such as 'my-secret-id')
 */
'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

async function getSecretMetadata(projectId, secretId) {
  const name = `projects/${projectId}/secrets/${secretId}`;

  try {
    const [secret] = await client.getSecret({
      name,
    });

    const replication = secret.replication;
    let replicationInfo;
    if (replication.automatic) {
      replicationInfo = 'automatic';
    } else if (replication.userManaged) {
      replicationInfo = 'user-managed';
    } else {
      replicationInfo = 'unknown';
    }

    const dateObj = new Date(Number(secret.createTime.seconds) * 1000);

    const createTime = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'long',
      timeZone: 'GMT',
    }).format(dateObj);

    console.log(`Found secret: ${secret.name}`);
    console.log(`  Create Time: ${createTime}`);
    console.log(`  Labels: ${JSON.stringify(secret.labels)}`);
    console.log(`  Replication: ${replicationInfo}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The secret '${name}' was not found. Verify the secret exists and the name is correct.`,
      );
    } else {
      console.error(`An unexpected error occurred: ${err.message}`);
    }
  }
}

module.exports = {getSecretMetadata};
// [END secretmanager_v1_secretmanagerservice_secret_get]
