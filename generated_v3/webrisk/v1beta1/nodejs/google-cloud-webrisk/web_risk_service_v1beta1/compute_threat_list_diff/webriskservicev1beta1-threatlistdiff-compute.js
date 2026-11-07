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

// [START webrisk_v1beta1_webriskservicev1beta1_compute_threat_list_diff]
'use strict';

const {v1beta1} = require('@google-cloud/web-risk');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.WebRiskServiceV1Beta1Client();

/**
 * Computes the threat list diff for the specified threat type.
 *
 * @param {string} threatType - The ThreatList to update, specifying the category of threats (for example, MALWARE, SOCIAL_ENGINEERING, UNWANTED_SOFTWARE).
 */
async function computeThreatListDiff(threatType) {
  try {
    const constraints = {
      supportedCompressions: ['RAW'],
      maxDiffEntries: 1024,
      maxDatabaseEntries: 2048,
    };

    const request = {
      threatType,
      constraints,
    };

    const [response] = await client.computeThreatListDiff(request);

    console.log(`Response type: ${response.responseType}`);
    if (response.newVersionToken) {
      console.log(`New version token: ${response.newVersionToken.toString('base64')}`);
    }
  } catch (err) {
    if (err.code !== undefined && Object.values(status).includes(err.code)) {
      console.error(`API Error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {computeThreatListDiff};
// [END webrisk_v1beta1_webriskservicev1beta1_compute_threat_list_diff]
