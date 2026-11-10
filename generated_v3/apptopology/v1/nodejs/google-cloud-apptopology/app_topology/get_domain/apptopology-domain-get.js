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

// [START apptopology_v1_apptopology_domain_get]
'use strict';

const {AppTopologyClient} = require('@google-cloud/apptopology');
const {status} = require('@grpc/grpc-js');

const client = new AppTopologyClient();

/**
 * Use the getDomain method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location for the domain (must be 'global').
 * @param {string} domainId - The pre-defined topology domain identifier (for example, 'SRE', 'DEVOPS', or 'SECURITY').
 */
async function getDomain(projectId, locationId, domainId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/domains/${domainId}`;
    const request = {
      name,
    };

    const [domain] = await client.getDomain(request);
    console.log(`Retrieved domain: ${domain.name}`);
    return domain;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Domain not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve domain: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getDomain };
// [END apptopology_v1_apptopology_domain_get]
