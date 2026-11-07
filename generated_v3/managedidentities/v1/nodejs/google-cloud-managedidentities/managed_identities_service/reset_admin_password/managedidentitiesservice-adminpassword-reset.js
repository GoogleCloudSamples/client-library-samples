// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START managedidentities_v1_managedidentitiesservice_reset_admin_password]
'use strict';

const {ManagedIdentitiesServiceClient} = require('@google-cloud/managed-identities');
const {status} = require('@grpc/grpc-js');

const client = new ManagedIdentitiesServiceClient();

/**
 * Resets the administrator password for a Managed Microsoft AD domain.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} domainId - The domain ID (for example, 'example.com').
 */
async function resetAdminPassword(projectId, domainId) {
  try {
    const name = `projects/${projectId}/locations/global/domains/${domainId}`;
    const request = {
      name,
    };

    const [response] = await client.resetAdminPassword(request);
    console.log(`Reset administrator password successfully for domain: ${name}`);
    console.log(`New administrator password: ${response.password}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Domain not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to reset administrator password: ${err.message}`);
    }
  }
}

module.exports = { resetAdminPassword };
// [END managedidentities_v1_managedidentitiesservice_reset_admin_password]
