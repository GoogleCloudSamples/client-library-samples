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

// [START managedidentities_v1_managedidentitiesservice_domains_list]
'use strict';

const {ManagedIdentitiesServiceClient} = require('@google-cloud/managed-identities');
const {status} = require('@grpc/grpc-js');

const client = new ManagedIdentitiesServiceClient();

/**
 * Lists Active Directory domains managed by the service.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listDomains(projectId) {
  try {
    const parent = `projects/${projectId}/locations/global`;
    const request = {
      parent,
    };

    const [domains] = await client.listDomains(request);

    if (!domains || domains.length === 0) {
      console.log('No domains found.');
      return;
    }

    for (const domain of domains) {
      console.log(`Domain Name: ${domain.name}`);
      console.log(`FQDN: ${domain.fqdn}`);
      console.log(`State: ${domain.state}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while listing domains:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else {
      console.error('Failed to list domains:', err.message || err);
    }
    throw err;
  }
}

module.exports = { listDomains };
// [END managedidentities_v1_managedidentitiesservice_domains_list]
