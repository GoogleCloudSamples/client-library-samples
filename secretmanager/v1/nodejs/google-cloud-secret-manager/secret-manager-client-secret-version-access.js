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

// [START secretmanager_v1_secretmanagerservice_secretversion_access]

'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

/**
 * Access Secret Version.
 *
 * Accesses a specific secret version. This sample demonstrates retrieving the
 * payload of a secret while enforcing cryptographic protection and access
 * control.
 *
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 * @param secretId ID of the secret (such as 'my-secret-id')
 * @param versionId ID of the version (such as 'latest')
 */
async function accessSecretVersion(projectId, secretId, versionId) {
  const name = `projects/${projectId}/secrets/${secretId}/versions/${versionId}`;

  try {
    const [version] = await client.accessSecretVersion({
      name,
    });

    const payload = version.payload.data.toString('utf8');

    console.log(`Accessed secret version: ${version.name}`);
    console.log(`  Payload: ${payload}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The secret version '${name}' was not found or you do not have permission to access it. Verify the secret version name and your permissions.`,
      );
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = {accessSecretVersion};
// [END secretmanager_v1_secretmanagerservice_secretversion_access]
