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

// [START domains_v1_domains_retrieve_register_parameters]
'use strict';

const {DomainsClient} = require('@google-cloud/domains');
const {status} = require('@grpc/grpc-js');

const client = new DomainsClient();

/**
 * Retrieves registration parameters for a domain.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} location - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function retrieveRegisterParameters(projectId, locationId, location) {
  try {
    const domainName = 'example.com';
    const parent = client.locationPath(projectId, locationId || location);

    const request = {
      location: parent,
      domainName,
    };

    const [response] = await client.retrieveRegisterParameters(request);

    console.log(`Domain name: ${response.registerParameters?.domainName}`);
    console.log(
      `Eligible for registration: ${response.registerParameters?.availability === 'AVAILABLE'}`
    );
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { retrieveRegisterParameters };
// [END domains_v1_domains_retrieve_register_parameters]
