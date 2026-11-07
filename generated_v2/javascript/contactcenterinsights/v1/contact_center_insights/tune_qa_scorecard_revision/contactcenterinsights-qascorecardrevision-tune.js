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

// [START contactcenterinsights_v1_contactcenterinsights_tune_qa_scorecard_revision]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Tunes an existing QA scorecard revision using feedback labels.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region ID (for example, 'us-central1').
 * @param {string} qaScorecardId - The ID of the QA scorecard.
 * @param {string} revisionId - The ID of the QA scorecard revision to tune.
 */
async function tuneQaScorecardRevision(projectId, locationId, qaScorecardId, revisionId) {
  try {
    const filter = 'create_time >= "2024-01-01T00:00:00Z"';
    const parent = `projects/${projectId}/locations/${locationId}/qaScorecards/${qaScorecardId}/revisions/${revisionId}`;

    const request = {
      parent,
      filter,
    };

    // TuneQaScorecardRevision is a long-running operation; wait for resolution.
    const [operation] = await client.tuneQaScorecardRevision(request);
    console.log(`Operation initiated: ${operation.name}`);

    const [response] = await operation.promise();
    console.log('Tuned QA scorecard revision completed successfully.');
    console.log(`Response: ${JSON.stringify(response)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('QA scorecard revision not found:', err.message);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error('Precondition failed for tuning request:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code) {
      console.error(`API error with code ${err.code}:`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { tuneQaScorecardRevision };
// [END contactcenterinsights_v1_contactcenterinsights_tune_qa_scorecard_revision]
