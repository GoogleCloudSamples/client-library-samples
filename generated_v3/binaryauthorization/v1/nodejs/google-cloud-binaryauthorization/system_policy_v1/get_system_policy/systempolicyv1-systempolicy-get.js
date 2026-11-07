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

// [START binaryauthorization_v1_systempolicyv1_systempolicy_get]
'use strict';

const {SystemPolicyV1Client} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new SystemPolicyV1Client();

/**
 * Retrieves the Binary Authorization system policy for a location.
 *
 * @param {string} locationId - The Google Cloud location for the system policy (for example, 'global').
 */
async function getSystemPolicy(locationId) {
  try {
    // Construct the resource name for the system policy
    const name = `locations/${locationId}/policy`;

    const [policy] = await client.getSystemPolicy({name});

    console.log(`System policy name: ${policy.name}`);
    console.log(`Global evaluation mode: ${policy.globalPolicyEvaluationMode}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`System policy not found at ${locationId}: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing system policy: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getSystemPolicy };
// [END binaryauthorization_v1_systempolicyv1_systempolicy_get]
