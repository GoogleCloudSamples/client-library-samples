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

// [START securitycentermanagement_v1_securitycentermanagement_securitycenterservice_get]
'use strict';

const {SecurityCenterManagementClient} = require('@google-cloud/securitycentermanagement');
const {status} = require('@grpc/grpc-js');

const client = new SecurityCenterManagementClient();

/**
 * Use the getSecurityCenterService method
 *
 * @param {string} serviceId - The Security Command Center service identifier (for example, 'security-health-analytics', 'event-threat-detection', 'container-threat-detection', 'vm-threat-detection', or 'web-security-scanner').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID, such as 'global'.
 */
async function getSecurityCenterService(serviceId, projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/securityCenterServices/${serviceId}`;

    const request = {
      name,
    };

    const [response] = await client.getSecurityCenterService(request);

    console.log(`Service name: ${response.name}`);
    console.log(`Intended enablement state: ${response.intendedEnablementState}`);
    console.log(`Effective enablement state: ${response.effectiveEnablementState}`);

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Security Center service not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to retrieve Security Center service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getSecurityCenterService };
// [END securitycentermanagement_v1_securitycentermanagement_securitycenterservice_get]
