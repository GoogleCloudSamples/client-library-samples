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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecard_create]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Creates a quality assurance (QA) scorecard in Contact Center Insights.
 */
async function createQaScorecard() {
  try {
    const projectId = await client.getProjectId();
    const location = process.env.LOCATION || 'us-central1';
    const parent = client.locationPath(projectId, location);
    const qaScorecard = {
      displayName: 'Customer Service Evaluation Scorecard',
      description: 'Assesses conversation quality against service metrics.',
    };

    const request = {
      parent,
      qaScorecard,
    };

    const [response] = await client.createQaScorecard(request);
    console.log(`Created QA scorecard: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`QA scorecard already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create QA scorecard: ${err.message}`);
    }
  }
}

module.exports = { createQaScorecard };
// [END contactcenterinsights_v1_contactcenterinsights_qascorecard_create]
