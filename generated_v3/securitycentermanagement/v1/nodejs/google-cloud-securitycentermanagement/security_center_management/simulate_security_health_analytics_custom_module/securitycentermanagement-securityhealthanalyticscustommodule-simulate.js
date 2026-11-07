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

// [START securitycentermanagement_v1_securitycentermanagement_simulate_security_health_analytics_custom_module]
'use strict';

const {SecurityCenterManagementClient} = require('@google-cloud/securitycentermanagement');
const {status} = require('@grpc/grpc-js');

const client = new SecurityCenterManagementClient();

/**
 * Use the simulateSecurityHealthAnalyticsCustomModule method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 */
async function simulateSecurityHealthAnalyticsCustomModule(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const customConfig = {
      predicate: {
        expression: 'has(resource.diskEncryptionKey)',
        title: 'Disk encryption check',
        description: 'Verifies whether the disk is configured with an encryption key',
      },
      resourceSelector: {
        resourceTypes: ['compute.googleapis.com/Disk'],
      },
      severity: 'CRITICAL',
      description: 'Simulated custom module rule verifying disk encryption configuration',
    };
    const resource = {
      resourceType: 'compute.googleapis.com/Disk',
      resourceData: {
        name: 'example-disk',
        diskEncryptionKey: {},
      },
    };

    const request = {
      parent,
      customConfig,
      resource,
    };

    const [response] = await client.simulateSecurityHealthAnalyticsCustomModule(request);

    console.log('Simulation completed successfully.');
    console.log(`Simulation result: ${JSON.stringify(response.result, null, 2)}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided in request: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Target parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Simulation call encountered an error: ${err.message}`);
    }
  }
}

module.exports = { simulateSecurityHealthAnalyticsCustomModule };
// [END securitycentermanagement_v1_securitycentermanagement_simulate_security_health_analytics_custom_module]
