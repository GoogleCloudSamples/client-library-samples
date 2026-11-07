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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecard_get]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Retrieves a QA scorecard from Contact Center Insights.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region ID (for example, us-central1).
 * @param {string} qaScorecardId - The ID of the QA scorecard to retrieve.
 */
async function getQaScorecard(projectId, locationId, qaScorecardId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/qaScorecards/${qaScorecardId}`;
    const request = {
      name,
    };

    const [qaScorecard] = await client.getQaScorecard(request);

    console.log(`Retrieved QA scorecard: ${qaScorecard.name}`);
    console.log(`Display name: ${qaScorecard.displayName}`);

    return qaScorecard;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`QA scorecard not found: ${err.message}`);
    } else {
      console.error(`Failed to retrieve QA scorecard: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getQaScorecard };
// [END contactcenterinsights_v1_contactcenterinsights_qascorecard_get]
