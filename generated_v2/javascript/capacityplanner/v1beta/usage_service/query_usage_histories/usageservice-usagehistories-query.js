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

// [START capacityplanner_v1beta_usageservice_query_usage_histories]
'use strict';

const {UsageServiceClient} = require('@google-cloud/capacityplanner');
const {status} = require('@grpc/grpc-js');

const client = new UsageServiceClient();

/**
 * Queries usage histories for a specified resource type.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 */
async function queryUsageHistories(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const cloudResourceType = 'gce-vcpus';

    const request = {
      parent,
      cloudResourceType,
    };

    const [response] = await client.queryUsageHistories(request);
    for (const history of response.usageHistories || []) {
      console.log(`Usage history: ${history.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { queryUsageHistories };
// [END capacityplanner_v1beta_usageservice_query_usage_histories]
