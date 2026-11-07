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

// [START contactcenterinsights_v1_contactcenterinsights_query_metrics]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Use the queryMetrics method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 */
async function queryMetrics(projectId, locationId) {
  try {
    const filter = 'create_time >= "2024-01-01T00:00:00Z" AND create_time < "2024-02-01T00:00:00Z"';
    const location = `projects/${projectId}/locations/${locationId}`;

    const request = {
      location,
      filter,
    };

    // QueryMetrics initiates a long-running operation
    const [operation] = await client.queryMetrics(request);
    const [response] = await operation.promise();

    console.log('Query metrics operation completed successfully.');
    if (response.rows) {
      console.log(`Retrieved ${response.rows.length} metric slices.`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { queryMetrics };
// [END contactcenterinsights_v1_contactcenterinsights_query_metrics]
