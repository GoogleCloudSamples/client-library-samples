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

// [START secretmanager_v1_secretmanagerservice_secretversion_enable]

'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {status} = require('@grpc/grpc-js');

const client = new SecretManagerServiceClient();

/**
 * Restore Access to a Secret Version.
 *
 * Enables a secret version, restoring access to a previously disabled version.
 * This demonstrates how to reactivate a secret version that was previously
 * disabled, making its payload accessible again.
 *
 * @param projectId Google Cloud Project ID (such as 'example-project-id')
 * @param secretId ID of the secret (such as 'my-secret-id')
 * @param versionId ID of the version (such as 'latest')
 */
async function enableSecretVersion(projectId, secretId, versionId) {
  const name = `projects/${projectId}/secrets/${secretId}/versions/${versionId}`;

  try {
    const [version] = await client.enableSecretVersion({
      name,
    });

    console.log(`Enabled secret version: ${version.name}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.error(
        `Error: The secret version '${name}' is already enabled. No action is required.`,
      );
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = {enableSecretVersion};
// [END secretmanager_v1_secretmanagerservice_secretversion_enable]
