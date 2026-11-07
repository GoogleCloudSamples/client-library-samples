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

// [START domains_v1_domains_registration_delete]
'use strict';

const {DomainsClient} = require('@google-cloud/domains');
const {status} = require('@grpc/grpc-js');

const client = new DomainsClient();

/**
 * Deletes a domain registration.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId The Google Cloud region where the service is located (for example, 'global').
 * @param {string} registrationId The domain registration ID (for example, 'example-registration-id').
 */
async function deleteRegistration(projectId, locationId, registrationId) {
  const name = client.registrationPath(
    projectId,
    locationId,
    registrationId
  );

  try {
    const [operation] = await client.deleteRegistration({name});
    await operation.promise();

    console.log(`Deleted registration: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      // Deletion is idempotent; report deletion success when the resource does not exist.
      console.log(`Deleted registration: ${name}`);
    } else {
      throw err;
    }
  }
}

module.exports = {deleteRegistration};
// [END domains_v1_domains_registration_delete]
