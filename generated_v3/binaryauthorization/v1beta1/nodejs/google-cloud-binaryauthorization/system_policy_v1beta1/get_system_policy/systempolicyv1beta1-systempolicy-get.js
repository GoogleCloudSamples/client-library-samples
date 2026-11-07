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

// [START binaryauthorization_v1beta1_systempolicyv1beta1_systempolicy_get]
'use strict';

const {v1beta1} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.SystemPolicyV1Beta1Client();

/**
 * Retrieves the Binary Authorization system policy for a given location.
 *
 * @param {string} locationId - The Google Cloud location for the system policy (for example, 'global').
 */
async function getSystemPolicy(locationId) {
  try {
    // Construct the resource name for the Google-maintained system policy.
    const name = `locations/${locationId}/policy`;

    const request = {
      name,
    };

    const [policy] = await client.getSystemPolicy(request);

    console.log(`Policy retrieved: ${policy.name}`);
    if (policy.description) {
      console.log(`Description: ${policy.description}`);
    }
    if (policy.defaultAdmissionRule) {
      console.log(`Default evaluation mode: ${policy.defaultAdmissionRule.evaluationMode}`);
      console.log(`Default enforcement mode: ${policy.defaultAdmissionRule.enforcementMode}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`System policy not found for location: ${locationId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Access denied when retrieving system policy: ${err.message}`);
    } else {
      console.error(`Request failed with error: ${err.message}`);
    }
  }
}

module.exports = { getSystemPolicy };
// [END binaryauthorization_v1beta1_systempolicyv1beta1_systempolicy_get]
