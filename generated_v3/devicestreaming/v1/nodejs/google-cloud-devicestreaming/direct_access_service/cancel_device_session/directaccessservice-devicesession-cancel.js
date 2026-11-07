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

// [START devicestreaming_v1_directaccessservice_devicesession_cancel]
'use strict';

const {DirectAccessServiceClient} = require('@google-cloud/devicestreaming');
const {status} = require('@grpc/grpc-js');

const client = new DirectAccessServiceClient();

/**
 * Cancels an active or pending device session.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} deviceSessionId - The ID of the DeviceSession to cancel (for example, 'example-device-session-id').
 */
async function cancelDeviceSession(projectId, deviceSessionId) {
  const name = `projects/${projectId}/deviceSessions/${deviceSessionId}`;

  try {
    const request = {
      name,
    };

    await client.cancelDeviceSession(request);
    console.log(`Device session canceled: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Device session not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Device session cannot be canceled in its current state: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for device session resource: ${name}`);
    } else {
      console.error(`Failed to cancel device session: ${err.message || err}`);
    }
    throw err;
  }
}

module.exports = { cancelDeviceSession };
// [END devicestreaming_v1_directaccessservice_devicesession_cancel]
