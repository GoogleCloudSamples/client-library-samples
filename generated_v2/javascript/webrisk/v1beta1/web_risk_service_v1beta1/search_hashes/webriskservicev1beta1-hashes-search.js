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

// [START webrisk_v1beta1_webriskservicev1beta1_hashes_search]
'use strict';

const {v1beta1} = require('@google-cloud/web-risk');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.WebRiskServiceV1Beta1Client();

/**
 * Searches for hash prefixes of malicious URIs.
 *
 * @param {Buffer|string} hashPrefix - The most significant 4-32 bytes of a SHA-256 hash.
 */
async function searchHashes(hashPrefix) {
  try {
    const threatTypes = ['MALWARE', 'SOCIAL_ENGINEERING'];

    const request = {
      hashPrefix: Buffer.from(hashPrefix),
      threatTypes,
    };

    const [response] = await client.searchHashes(request);

    console.log(`Search completed. Threats found: ${response.threats ? response.threats.length : 0}`);
    if (response.threats && response.threats.length > 0) {
      for (const threat of response.threats) {
        console.log(`Threat types: ${threat.threatTypes ? threat.threatTypes.join(', ') : 'None'}`);
        console.log(`Threat hash: ${threat.hash ? threat.hash.toString('hex') : ''}`);
      }
    }
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Web Risk API error: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {searchHashes};
// [END webrisk_v1beta1_webriskservicev1beta1_hashes_search]
