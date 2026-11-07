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

// [START webrisk_v1_webriskservice_compute_threat_list_diff]
'use strict';

const {WebRiskServiceClient} = require('@google-cloud/web-risk');
const {status} = require('@grpc/grpc-js');

/**
 * Computes the threat list diff for malware threats.
 */
async function computeThreatListDiff() {
  const threatType = 'MALWARE';
  const constraints = {
    maxDiffEntries: 1024,
    maxDatabaseEntries: 2048,
    supportedCompressions: ['RAW'],
  };

  const client = new WebRiskServiceClient();

  try {
    const request = {
      threatType,
      constraints,
    };

    const [response] = await client.computeThreatListDiff(request);

    console.log(`Response type: ${response.responseType}`);
    if (response.newVersionToken) {
      console.log(
        `New version token: ${Buffer.from(response.newVersionToken).toString('base64')}`
      );
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.log(
        'The Web Risk API requires activation in the Google Cloud console.'
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('An invalid argument was provided.');
    } else if (err.code === status.NOT_FOUND) {
      console.error('The requested resource was not found.');
    } else {
      throw err;
    }
  }
}

module.exports = { computeThreatListDiff };
// [END webrisk_v1_webriskservice_compute_threat_list_diff]
