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

// [START apigeeconnect_v1_tether_egress]
'use strict';

const {TetherClient} = require('@google-cloud/apigee-connect');
const {status} = require('@grpc/grpc-js');

/**
 * Establishes a Tether egress stream connection with Apigee Connect.
 *
 * @param {string} projectId - The Google Cloud project identifier.
 */
async function egress(projectId) {
  const client = new TetherClient();
  try {
    const formattedProject = `projects/${projectId}`;

    await new Promise((resolve, reject) => {
      const stream = client.egress();

      stream.on('data', egressRequest => {
        console.log(`Received egress request ID: ${egressRequest.id}`);

        const httpResponse = {
          id: egressRequest.id,
          status: '200 OK',
          statusCode: 200,
          body: Buffer.from('OK'),
        };

        const responseStatus = {
          code: status.OK,
          message: 'Success',
        };

        const egressResponse = {
          id: egressRequest.id,
          project: formattedProject,
          traceId: egressRequest.traceId,
          endpoint: egressRequest.endpoint,
          status: responseStatus,
          httpResponse: httpResponse,
        };

        stream.write(egressResponse);
        console.log(`Dispatched egress response for request ID: ${egressRequest.id}`);
      });

      stream.on('error', err => {
        reject(err);
      });

      stream.on('end', () => {
        console.log('Egress stream connection closed.');
        resolve();
      });

      console.log(`Established egress stream for project: ${formattedProject}`);

      // Signals the end of client responses and closes the stream connection.
      stream.end();
    });
  } catch (err) {
    if (typeof err.code === 'number' && Object.values(status).includes(err.code)) {
      console.error(`Google Cloud RPC error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { egress };
// [END apigeeconnect_v1_tether_egress]
