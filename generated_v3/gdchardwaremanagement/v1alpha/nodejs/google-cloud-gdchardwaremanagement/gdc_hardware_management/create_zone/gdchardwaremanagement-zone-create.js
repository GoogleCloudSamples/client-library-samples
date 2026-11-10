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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_create]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Use the createZone method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} zoneId - The caller-chosen ID to use for the Zone, which will become the final component of the zone's resource name. Must be at most 63 characters, start with a lowercase letter, and contain only lowercase letters, numbers, and hyphens (hyphens cannot be first or last).
 */
async function createZone(projectId, locationId, zoneId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const zone = {
      displayName: 'Example Zone',
      contacts: [
        {
          givenName: 'Alex',
          email: 'alex@example.com',
          phone: '+1-555-010-0001',
        },
      ],
    };

    const request = {
      parent,
      zoneId,
      zone,
    };

    // CreateZone initiates a long-running operation
    const [operation] = await client.createZone(request);
    const [response] = await operation.promise();

    console.log(`Created zone: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Zone already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error creating zone: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createZone };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_create]
