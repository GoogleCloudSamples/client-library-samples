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

// [START contactcenterinsights_v1_contactcenterinsights_calculate_stats]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Use the calculateStats method
 *
 * @param {string} location - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function calculateStats(location) {
  try {
    const projectId = await client.getProjectId();
    const request = {
      location: client.locationPath(projectId, location),
    };

    const [response] = await client.calculateStats(request);

    console.log(`Calculated conversation count: ${response.conversationCount}`);
    console.log(`Average turn count: ${response.averageTurnCount}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Calculate stats failed: ${err.message || err}`);
    }
  }
}

module.exports = { calculateStats };
// [END contactcenterinsights_v1_contactcenterinsights_calculate_stats]
