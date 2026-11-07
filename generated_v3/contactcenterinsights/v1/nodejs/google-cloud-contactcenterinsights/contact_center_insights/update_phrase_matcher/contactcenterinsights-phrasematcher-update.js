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

// [START contactcenterinsights_v1_contactcenterinsights_phrasematcher_update]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Updates an existing phrase matcher in Google Cloud Contact Center Insights.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 * @param {string} phraseMatcherId - The resource ID of the existing phrase matcher to update.
 */
async function updatePhraseMatcher(projectId, locationId, phraseMatcherId) {
  try {
    const phraseMatcher = {
      name: `projects/${projectId}/locations/${locationId}/phraseMatchers/${phraseMatcherId}`,
      displayName: 'Updated Phrase Matcher',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      phraseMatcher,
      updateMask,
    };

    const [response] = await client.updatePhraseMatcher(request);
    console.log(`Updated phrase matcher: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Phrase matcher not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update phrase matcher: ${err.message}`);
    }
  }
}

module.exports = { updatePhraseMatcher };
// [END contactcenterinsights_v1_contactcenterinsights_phrasematcher_update]
