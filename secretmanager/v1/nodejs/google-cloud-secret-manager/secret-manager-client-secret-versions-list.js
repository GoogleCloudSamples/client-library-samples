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

// [START secretmanager_v1_secretmanagerservice_secretversions_list]

'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

/**
 * List Secret Versions.
 *
 * Lists all secret versions for a given secret. This demonstrates how to view
 * all versions associated with a secret and verify their state within a global
 * environment.
 *
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 * @param secretId ID of the secret (such as 'my-secret-id')
 */
async function listSecretVersions(projectId, secretId) {
  const parent = `projects/${projectId}/secrets/${secretId}`;

  try {
    const [versions] = await client.listSecretVersions({
      parent,
    });

    for (const version of versions) {
      console.log(`Found version: ${version.name}`);
      console.log(`  State: ${version.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The secret '${secretId}' was not found in project '${projectId}'. Verify the secret and project exist.`,
      );
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = {listSecretVersions};
// [END secretmanager_v1_secretmanagerservice_secretversions_list]
