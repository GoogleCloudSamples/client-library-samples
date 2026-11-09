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

// [START cloudresourcemanager_v3_organizations_organizations_search]
'use strict';

const {OrganizationsClient} = require('@google-cloud/resource-manager');
const {status} = require('@grpc/grpc-js');

const client = new OrganizationsClient();

/**
 * Use the searchOrganizations method
 *
 * @param {string} query - Query string used to filter the organizations to return in the response, for example 'domain:example.com' or 'directoryCustomerId:123456789'.
 */
async function searchOrganizations(query) {
  try {
    const request = {
      query,
    };

    // Auto-paginates across results matching the filter criteria
    const [organizations] = await client.searchOrganizations(request);

    if (organizations.length === 0) {
      console.log('No organizations matched the search query.');
      return;
    }

    for (const organization of organizations) {
      console.log(`Organization: ${organization.name}`);
      console.log(`Display Name: ${organization.displayName}`);
      console.log(`State: ${organization.state}`);
      console.log(`Directory Customer ID: ${organization.directoryCustomerId}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid query syntax: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while searching organizations: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Request is unauthenticated: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { searchOrganizations };
// [END cloudresourcemanager_v3_organizations_organizations_search]
