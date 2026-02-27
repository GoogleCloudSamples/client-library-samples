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

// [START secretmanager_v1_secretmanagerservice_secretversion_destroy]
/**
 * Destroy Secret Version.
 *
 * Destroys a specific secret version, demonstrating irreversible deletion of a
 * secret's payload. This operation enforces cryptographic protection and
 * access control for the secret.
 *
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 * @param secretId ID of the secret (such as 'my-secret-id')
 * @param versionId ID of the version (such as 'latest')
 */
'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

async function destroySecretVersion(projectId, secretId, versionId) {
  const name = `projects/${projectId}/secrets/${secretId}/versions/${versionId}`;

  try {
    const [version] = await client.destroySecretVersion({
      name,
    });

    console.log(`Destroyed secret version: ${version.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The secret version '${name}' does not exist or has already been destroyed. Check the secret name and version number.`,
      );
    } else {
      console.error(`An unexpected error occurred: ${err.message}`);
    }
  }
}

module.exports = {destroySecretVersion};
// [END secretmanager_v1_secretmanagerservice_secretversion_destroy]
