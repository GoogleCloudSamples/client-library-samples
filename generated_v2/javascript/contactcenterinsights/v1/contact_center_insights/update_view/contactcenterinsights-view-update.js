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

// [START contactcenterinsights_v1_contactcenterinsights_view_update]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Updates a Contact Center Insights view.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID.
 * @param {string} viewId - The ID of the View to update.
 */
async function updateView(projectId, locationId, viewId) {
  try {
    const view = {
      name: client.viewPath(projectId, locationId, viewId),
      displayName: 'Updated View Display Name',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const [response] = await client.updateView({
      view,
      updateMask,
    });

    console.log(`Updated view: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`View resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing view: ${err.message}`);
    } else {
      console.error(`API error updating view: ${err.message}`);
    }
  }
}

module.exports = { updateView };
// [END contactcenterinsights_v1_contactcenterinsights_view_update]
