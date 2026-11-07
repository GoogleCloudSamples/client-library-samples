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

// [START contactcenterinsights_v1_contactcenterinsights_analysisrule_create]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Creates an analysis rule in Google Cloud Contact Center Insights.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 */
async function createAnalysisRule(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const annotatorSelector = {
      runSilenceAnnotator: true,
    };

    const analysisRule = {
      displayName: 'example-analysis-rule',
      analysisPercentage: 1.0,
      active: true,
      conversationFilter: '',
      annotatorSelector,
    };

    const request = {
      parent,
      analysisRule,
    };

    const [response] = await client.createAnalysisRule(request);
    console.log(`Created analysis rule: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Analysis rule already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error with status code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {createAnalysisRule};
// [END contactcenterinsights_v1_contactcenterinsights_analysisrule_create]
