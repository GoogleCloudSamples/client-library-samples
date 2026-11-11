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

// [START domains_v1_domains_registrations_list]
'use strict';

const {DomainsClient} = require('@google-cloud/domains');
const {status} = require('@grpc/grpc-js');

const client = new DomainsClient();

/**
 * Lists Cloud Domains registrations in a project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location for Cloud Domains (must be 'global').
 */
async function listRegistrations(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [registrations] = await client.listRegistrations({
      parent,
    });

    if (!registrations || registrations.length === 0) {
      console.log('No registrations found.');
      return;
    }

    for (const registration of registrations) {
      console.log(`Domain name: ${registration.domainName}`);
      console.log(`State: ${registration.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listRegistrations };
// [END domains_v1_domains_registrations_list]
