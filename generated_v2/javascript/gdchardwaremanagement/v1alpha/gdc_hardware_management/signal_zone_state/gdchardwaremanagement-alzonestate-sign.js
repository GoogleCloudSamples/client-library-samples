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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_signal_zone_state]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Signals a state change for a GDC Hardware Management zone.
 *
 * @param {string} projectId Google Cloud project ID.
 * @param {string} locationId Google Cloud location.
 * @param {string} zoneId GDC Hardware Management zone identifier.
 */
async function signalZoneState(projectId, locationId, zoneId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/zones/${zoneId}`;
    const stateSignal = 'FACTORY_TURNUP_CHECKS_STARTED';

    const request = {
      name,
      stateSignal,
    };

    // SignalZoneState initiates a long-running operation that requires awaiting completion.
    const [operation] = await client.signalZoneState(request);
    const [response] = await operation.promise();

    console.log(`Zone state signaled: ${response.name}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(`Zone ${zoneId} state does not satisfy turnup prerequisites.`);
    } else if (err.code === status.NOT_FOUND) {
      console.log(`Zone ${zoneId} was not found.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log(`Access to zone ${zoneId} was denied.`);
    } else {
      console.log(`Request could not be processed for zone ${zoneId}.`);
    }
  }
}

module.exports = { signalZoneState };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_signal_zone_state]
