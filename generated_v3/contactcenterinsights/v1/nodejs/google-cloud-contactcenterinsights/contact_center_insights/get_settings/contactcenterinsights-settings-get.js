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

// [START contactcenterinsights_v1_contactcenterinsights_settings_get]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Retrieves the Contact Center Insights settings for a project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID.
 */
async function getSettings(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/settings`;
    const request = {
      name,
    };

    const [settings] = await client.getSettings(request);

    console.log(`Settings name: ${settings.name}`);
    console.log(`Settings create time: ${settings.createTime?.seconds || 'N/A'}`);
    return settings;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Settings resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing settings: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { getSettings };
// [END contactcenterinsights_v1_contactcenterinsights_settings_get]
