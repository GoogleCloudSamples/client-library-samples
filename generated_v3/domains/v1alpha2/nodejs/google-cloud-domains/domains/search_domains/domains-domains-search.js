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

// [START domains_v1alpha2_domains_domains_search]
'use strict';

const {DomainsClient} = require('@google-cloud/domains');
const {status} = require('@grpc/grpc-js');

const client = new DomainsClient();

/**
 * Searches for domain availability matching the query.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'global')
 * @param {string} location - The Google Cloud region where the service is located (for example, 'projects/example-project-id/locations/global')
 */
async function searchDomains(projectId, locationId, location) {
  try {
    const query = 'example-query';
    const formattedLocation = location.startsWith('projects/')
      ? location
      : `projects/${projectId}/locations/${locationId}`;

    const request = {
      location: formattedLocation,
      query,
    };

    const [response] = await client.searchDomains(request);

    if (response.registerParameters && response.registerParameters.length > 0) {
      for (const parameter of response.registerParameters) {
        console.log(`Domain: ${parameter.domainName}, Availability: ${parameter.availability}`);
      }
    } else {
      console.log('No domains found matching the search criteria.');
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Search domains failed: ${err.message}`);
    }
  }
}

module.exports = { searchDomains };
// [END domains_v1alpha2_domains_domains_search]
