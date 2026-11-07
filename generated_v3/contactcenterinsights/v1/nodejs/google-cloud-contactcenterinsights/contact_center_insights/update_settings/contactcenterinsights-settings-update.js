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

// [START contactcenterinsights_v1_contactcenterinsights_settings_update]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Updates project-level settings for Contact Center Insights.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID.
 */
async function updateSettings(projectId, locationId) {
  try {
    const settings = {
      name: `projects/${projectId}/locations/${locationId}/settings`,
      languageCode: 'en-US',
    };
    const updateMask = {
      paths: ['language_code'],
    };

    const request = {
      settings,
      updateMask,
    };

    const [response] = await client.updateSettings(request);
    console.log(`Settings name: ${response.name}`);
    console.log(`Language code: ${response.languageCode}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Settings resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { updateSettings };
// [END contactcenterinsights_v1_contactcenterinsights_settings_update]
