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

// [START webrisk_v1beta1_webriskservicev1beta1_uris_search]
'use strict';

const {WebRiskServiceV1Beta1Client} = require('@google-cloud/web-risk').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new WebRiskServiceV1Beta1Client();

/**
 * Searches for threats in the provided URI.
 *
 * @param {string} uri - The URI to check for matches across the specified threat lists.
 */
async function searchUris(uri) {
  try {
    const threatTypes = ['MALWARE', 'SOCIAL_ENGINEERING'];
    const request = {
      uri,
      threatTypes,
    };

    const [response] = await client.searchUris(request);

    if (response.threat) {
      console.log(`Threat detected for URI: ${uri}`);
      console.log(`Threat details: ${JSON.stringify(response.threat)}`);
    } else {
      console.log(`No threats found for URI: ${uri}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error encountered (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { searchUris };
// [END webrisk_v1beta1_webriskservicev1beta1_uris_search]
