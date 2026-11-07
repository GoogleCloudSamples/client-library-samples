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

// [START webrisk_v1_webriskservice_uris_search]
'use strict';

const {WebRiskServiceClient} = require('@google-cloud/web-risk');
const {status} = require('@grpc/grpc-js');

const client = new WebRiskServiceClient();

/**
 * Use the searchUris method
 *
 * @param {string} uri - The URI to be checked for threats.
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
      console.log(`Threat types: ${response.threat.threatTypes.join(', ')}`);
    } else {
      console.log(`No threats detected for URI: ${uri}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAVAILABLE) {
      console.error(`Web Risk service unavailable: ${err.message}`);
    } else if (err.code) {
      console.error(`Web Risk API error: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { searchUris };
// [END webrisk_v1_webriskservice_uris_search]
