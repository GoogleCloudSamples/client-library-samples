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

// [START secretmanager_v1_secretmanagerservice_secrets_list]

'use strict';

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
      console.log(`Found secret: ${secret.name}`);
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

module.exports = {listSecrets};
// [END secretmanager_v1_secretmanagerservice_secrets_list]
