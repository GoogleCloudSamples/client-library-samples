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

// [START managedidentities_v1beta1_managedidentitiesservice_domain_update]
'use strict';

const {ManagedIdentitiesServiceClient} = require('@google-cloud/managed-identities');
const {status} = require('@grpc/grpc-js');

const client = new ManagedIdentitiesServiceClient();

/**
 * Updates an existing Managed Microsoft Active Directory domain.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the domain. Must be 'global'.
 * @param {string} domainId - The resource identifier or domain name of the Active Directory domain.
 */
async function updateDomain(projectId, locationId, domainId) {
  try {
    const domain = {
      name: `projects/${projectId}/locations/${locationId}/domains/${domainId}`,
      labels: {
        env: 'test',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    // UpdateDomain returns a long-running operation
    const [operation] = await client.updateDomain({
      domain,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated domain: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Domain not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Domain precondition failed: ${err.message}`);
    } else if (err.code) {
      console.error(`Operation failed with status code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateDomain };
// [END managedidentities_v1beta1_managedidentitiesservice_domain_update]
