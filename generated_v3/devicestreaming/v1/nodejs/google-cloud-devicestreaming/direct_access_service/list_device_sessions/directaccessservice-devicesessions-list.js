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

// [START devicestreaming_v1_directaccessservice_devicesessions_list]
'use strict';

const {DirectAccessServiceClient} = require('@google-cloud/devicestreaming');
const {status} = require('@grpc/grpc-js');

const client = new DirectAccessServiceClient();

/**
 * Use the listDeviceSessions method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listDeviceSessions(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [sessions] = await client.listDeviceSessions(request);

    console.log(`Retrieved ${sessions.length} device session(s).`);
    for (const session of sessions) {
      console.log(`Device session: ${session.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code && Object.values(status).includes(err.code)) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listDeviceSessions };
// [END devicestreaming_v1_directaccessservice_devicesessions_list]
