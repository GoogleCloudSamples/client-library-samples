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

// [START domains_v1alpha2_domains_retrieve_register_parameters]
'use strict';

const {DomainsClient} = require('@google-cloud/domains');
const {status} = require('@grpc/grpc-js');

const client = new DomainsClient();

/**
 * Retrieves registration parameters for a domain.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location ID (for example, 'global')
 * @param {string} location - The Google Cloud resource path (for example, 'projects/example-project-id/locations/global')
 */
async function retrieveRegisterParameters(projectId, locationId, location) {
  try {
    const domainName = 'example.com';

    const parentLocation =
      location && location.startsWith('projects/')
        ? location
        : `projects/${projectId}/locations/${locationId}`;

    const request = {
      location: parentLocation,
      domainName,
    };

    const [response] = await client.retrieveRegisterParameters(request);
    console.log(`Domain name: ${response.registerParameters?.domainName}`);
    console.log(
      `Is domain available: ${response.registerParameters?.availability === 'AVAILABLE'}`
    );
    return response;
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { retrieveRegisterParameters };
// [END domains_v1alpha2_domains_retrieve_register_parameters]
