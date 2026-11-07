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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_site_create]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Use the createSite method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} siteId - The caller-chosen ID to uniquely identify the Site within its parent scope. Must contain at most 63 characters, begin with a lowercase letter, and consist only of lowercase letters, numbers, and hyphens (hyphens cannot be first or last).
 */
async function createSite(projectId, locationId, siteId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const address = {
      regionCode: 'US',
      addressLines: ['1600 Amphitheatre Pkwy'],
      locality: 'Mountain View',
      administrativeArea: 'CA',
      postalCode: '94043',
    };

    const contact = {
      givenName: 'Alex',
      email: 'alex@example.com',
      phone: '+15550100000',
    };

    const site = {
      displayName: 'Example Data Center Site',
      description: 'Primary edge site location',
      organizationContact: {
        address,
        contacts: [contact],
      },
    };

    // Initiate the long-running operation to create the site
    const [operation] = await client.createSite({
      parent,
      siteId,
      site,
    });

    // Wait for the operation to complete
    const [response] = await operation.promise();
    console.log(`Created site: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Site already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create site: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createSite };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_site_create]
