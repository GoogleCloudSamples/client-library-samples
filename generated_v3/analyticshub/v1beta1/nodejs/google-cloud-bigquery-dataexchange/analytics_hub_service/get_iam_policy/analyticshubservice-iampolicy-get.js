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

// [START analyticshub_v1beta1_analyticshubservice_iampolicy_get]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-data-exchange');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Retrieves the IAM policy for a specified Analytics Hub data exchange.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The geographic location of the data exchange (for example, 'us' or 'us-central1').
 * @param {string} dataExchangeId - The identifier of the existing data exchange.
 */
async function getIamPolicy(projectId, locationId, dataExchangeId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}`;
    const request = {
      resource,
    };

    const [policy] = await client.getIamPolicy(request);

    console.log(`Retrieved IAM policy for: ${resource}`);
    console.log(`Policy version: ${policy.version}`);
    if (policy.bindings) {
      for (const binding of policy.bindings) {
        console.log(`Role: ${binding.role}`);
        console.log(`Members: ${binding.members ? binding.members.join(', ') : 'None'}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing resource: ${err.message}`);
    } else {
      console.error(`Failed to retrieve IAM policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIamPolicy };
// [END analyticshub_v1beta1_analyticshubservice_iampolicy_get]
