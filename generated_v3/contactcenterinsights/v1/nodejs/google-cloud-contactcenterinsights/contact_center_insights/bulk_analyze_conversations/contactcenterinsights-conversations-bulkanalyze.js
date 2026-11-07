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

// [START contactcenterinsights_v1_contactcenterinsights_bulk_analyze_conversations]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Use the bulkAnalyzeConversations method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID (e.g., "us-central1").
 */
async function bulkAnalyzeConversations(projectId, locationId) {
  try {
    const analysisPercentage = 100.0;
    const parent = `projects/${projectId}/locations/${locationId}`;
    const filter = 'medium="PHONE_CALL"';

    const request = {
      parent,
      filter,
      analysisPercentage,
    };

    // BulkAnalyzeConversations is a long-running operation; initiate and await completion
    const [operation] = await client.bulkAnalyzeConversations(request);
    const [response] = await operation.promise();

    console.log(`Successful analysis count: ${response.successfulAnalysisCount}`);
    console.log(`Failed analysis count: ${response.failedAnalysisCount}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Google API error (code: ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { bulkAnalyzeConversations };
// [END contactcenterinsights_v1_contactcenterinsights_bulk_analyze_conversations]
