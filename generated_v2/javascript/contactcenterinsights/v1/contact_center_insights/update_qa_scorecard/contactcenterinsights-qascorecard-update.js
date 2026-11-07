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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecard_update]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Use the updateQaScorecard method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (e.g., 'us-central1').
 * @param {string} qaScorecardId - The ID of the QA scorecard to update. Sourced from an existing scorecard, for example via ListQaScorecards.
 */
async function updateQaScorecard(projectId, locationId, qaScorecardId) {
  try {
    const updateMask = {
      paths: ['description'],
    };

    const qaScorecard = {
      name: `projects/${projectId}/locations/${locationId}/qaScorecards/${qaScorecardId}`,
      description: 'Updated scorecard description',
    };

    const request = {
      qaScorecard,
      updateMask,
    };

    const [response] = await client.updateQaScorecard(request);

    console.log(`Updated QA scorecard: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateQaScorecard };
// [END contactcenterinsights_v1_contactcenterinsights_qascorecard_update]
