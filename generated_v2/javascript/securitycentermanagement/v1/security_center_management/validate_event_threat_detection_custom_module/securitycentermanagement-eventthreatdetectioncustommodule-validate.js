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

// [START securitycentermanagement_v1_securitycentermanagement_validate_event_threat_detection_custom_module]
'use strict';

const {SecurityCenterManagementClient} = require('@google-cloud/securitycentermanagement');
const {status} = require('@grpc/grpc-js');

const client = new SecurityCenterManagementClient();

/**
 * Validates an Event Threat Detection custom module configuration.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location where the service is located (typically 'global').
 */
async function validateEventThreatDetectionCustomModule(projectId, locationId) {
  try {
    const rawText = JSON.stringify({
      ips: ['192.0.2.1'],
      metadata: {
        severity: 'LOW',
        description: 'Flagged suspicious IP address match.',
      },
    });
    const type = 'CONFIGURABLE_BAD_IP';
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
      rawText,
      type,
    };

    const [response] = await client.validateEventThreatDetectionCustomModule(request);

    console.log(`Validation result for module at parent: ${parent}`);
    console.log(`Validation response: ${JSON.stringify(response)}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid module configuration argument: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { validateEventThreatDetectionCustomModule };
// [END securitycentermanagement_v1_securitycentermanagement_validate_event_threat_detection_custom_module]
