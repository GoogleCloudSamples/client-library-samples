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

// [START analyticshub_v1_analyticshubservice_subscriptions_list]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Lists subscriptions in a Google Cloud project and location.
 */
async function listSubscriptions() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us';
    const parent = client.locationPath(projectId, location);

    const request = {
      parent,
    };

    const [subscriptions] = await client.listSubscriptions(request);
    console.log(`Retrieved ${subscriptions.length} subscription(s).`);
    for (const subscription of subscriptions) {
      console.log(`Subscription: ${subscription.name}`);
      console.log(`State: ${subscription.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listSubscriptions };
// [END analyticshub_v1_analyticshubservice_subscriptions_list]
