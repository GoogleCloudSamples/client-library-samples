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

// [START contactcenterinsights_v1_contactcenterinsights_phrasematcher_get]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Use the getPhraseMatcher method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 * @param {string} phraseMatcherId - The ID of the phrase matcher to retrieve.
 */
async function getPhraseMatcher(projectId, locationId, phraseMatcherId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/phraseMatchers/${phraseMatcherId}`;

    const request = {
      name,
    };

    const [phraseMatcher] = await client.getPhraseMatcher(request);

    console.log(`Resource name: ${phraseMatcher.name}`);
    console.log(`Display name: ${phraseMatcher.displayName}`);
    console.log(`Matcher type: ${phraseMatcher.type}`);

    return phraseMatcher;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Phrase matcher not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing phrase matcher: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPhraseMatcher };
// [END contactcenterinsights_v1_contactcenterinsights_phrasematcher_get]
