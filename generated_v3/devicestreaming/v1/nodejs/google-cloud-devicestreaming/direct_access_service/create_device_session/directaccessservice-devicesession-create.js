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

// [START devicestreaming_v1_directaccessservice_devicesession_create]
'use strict';

const {DirectAccessServiceClient} = require('@google-cloud/devicestreaming');
const {status} = require('@grpc/grpc-js');

const client = new DirectAccessServiceClient();

/**
 * Creates a device session for direct access streaming.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} deviceSessionId - The client-assigned ID for the DeviceSession (for example, 'example-device-session-01').
 */
async function createDeviceSession(projectId, deviceSessionId) {
  try {
    const parent = `projects/${projectId}`;
    const deviceSession = {
      androidDevice: {
        androidModelId: 'shiba',
        androidVersionId: '34',
      },
      ttl: {
        seconds: 900,
      },
    };

    const request = {
      parent,
      deviceSession,
      deviceSessionId,
    };

    const [response] = await client.createDeviceSession(request);
    console.log(`Device session created: ${response.name}`);
    console.log(`State: ${response.state}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Session already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid arguments provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API request failed with status code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createDeviceSession };
// [END devicestreaming_v1_directaccessservice_devicesession_create]
