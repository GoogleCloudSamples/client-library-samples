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

// [START devicestreaming_v1_directaccessservice_devicesession_update]
'use strict';

const {DirectAccessServiceClient} = require('@google-cloud/devicestreaming');
const {status} = require('@grpc/grpc-js');

const client = new DirectAccessServiceClient();

/**
 * Updates an existing device session.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} deviceSessionId - The ID of the DeviceSession (4-63 characters, matching [a-z0-9-]).
 */
async function updateDeviceSession(projectId, deviceSessionId) {
  try {
    const deviceSession = {
      name: `projects/${projectId}/deviceSessions/${deviceSessionId}`,
      ttl: {
        seconds: 1800,
      },
    };
    const updateMask = {
      paths: ['ttl'],
    };

    const request = {
      deviceSession,
      updateMask,
    };

    const [response] = await client.updateDeviceSession(request);

    console.log(`Updated device session: ${response.name}`);
    console.log(`Device session state: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Device session not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateDeviceSession };
// [END devicestreaming_v1_directaccessservice_devicesession_update]
