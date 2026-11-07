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

// [START devicestreaming_v1_directaccessservice_adb_connect]
'use strict';

const {DirectAccessServiceClient} = require('@google-cloud/devicestreaming');
const {status, Metadata} = require('@grpc/grpc-js');

const client = new DirectAccessServiceClient();

/**
 * Use the adbConnect method
 *
 * @param {string} projectId - The Google Cloud project ID where the DeviceSession is allocated.
 * @param {string} deviceSessionId - The identifier of the DeviceSession to connect to via ADB. Can be caller-specified or server-generated at session creation.
 */
async function adbConnect(projectId, deviceSessionId) {
  try {
    const sessionName = `projects/${projectId}/deviceSessions/${deviceSessionId}`;
    const metadata = new Metadata();
    metadata.set('X-Omnilab-Session-Name', sessionName);

    console.log(`Connecting to ADB stream for session: ${sessionName}`);

    await new Promise((resolve, reject) => {
      const stream = client.adbConnect({
        otherArgs: {
          metadata,
        },
      });

      stream.on('data', response => {
        console.log('Received ADB response packet from device session.');
      });

      stream.on('error', err => {
        reject(err);
      });

      stream.on('end', () => {
        console.log('ADB connection stream closed.');
        resolve();
      });

      // Half-close the client writing channel when done sending ADB frames
      stream.end();
    });
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Device session not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Device session is not in an active state: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication failed: ${err.message}`);
    } else {
      console.error(`ADB connection encountered an error: ${err.message}`);
    }
  }
}

module.exports = { adbConnect };
// [END devicestreaming_v1_directaccessservice_adb_connect]
