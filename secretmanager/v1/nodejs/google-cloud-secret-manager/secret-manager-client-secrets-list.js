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

// [START secretmanager_v1_secretmanagerservice_secrets_list]
// [START secretmanager_secretmanagerservice_secrets_list]
// [START secretmanager_list_secrets]

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

/**
 * List Secrets within a Project.
 *
 * Lists all secrets within a specified Google Cloud project. This sample
 * demonstrates how to discover available secret resources and retrieve their
 * metadata.
 *
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 */
async function listSecrets(projectId) {
  try {
    const parent = `projects/${projectId}`;

    const [secrets] = await client.listSecrets({
      parent,
    });

    if (secrets.length === 0) {
      console.log(`No secrets found for parent '${parent}'.`);
      return;
    }

    for (const secret of secrets) {

      const dateObj = new Date(Number(secret.createTime.seconds) * 1000);

      const createTime = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'long',
        timeZone: 'GMT',
      }).format(dateObj);

      console.log(`Found secret: ${secret.name}`);
      console.log(`  Create Time: ${createTime}`);
      console.log(`  Labels: ${JSON.stringify(secret.labels)}`);
      console.log(`  Replication: ${secret.replication.replication}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied when listing secrets in project '${projectId}'.`,
      );
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

// [END secretmanager_list_secrets]
// [END secretmanager_secretmanagerservice_secrets_list]
// [END secretmanager_v1_secretmanagerservice_secrets_list]

module.exports = {listSecrets};
