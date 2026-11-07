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

// [START domains_v1_domains_domains_search]
'use strict';

const {DomainsClient} = require('@google-cloud/domains');
const {status} = require('@grpc/grpc-js');

const client = new DomainsClient();

/**
 * Searches for domain name availability and registration parameters.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'global')
 * @param {string} location - The Google Cloud region where the service is located (for example, 'global')
 */
async function searchDomains(projectId, locationId, location) {
  try {
    const query = 'example.com';
    const locationPath = client.locationPath(projectId, locationId || location);

    const request = {
      location: locationPath,
      query,
    };

    const [response] = await client.searchDomains(request);

    console.log(`Search results for query: ${query}`);
    for (const result of response.registerParameters || []) {
      if (result.domainName === query) {
        const isAvailable = result.availability === 'AVAILABLE';
        console.log(`Domain: ${result.domainName}, Available: ${isAvailable}`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else {
      console.error('Domain search failed:', err.message);
    }
  }
}

module.exports = {searchDomains};
// [END domains_v1_domains_domains_search]
