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

// [START contactcenterinsights_v1_contactcenterinsights_view_get]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Retrieves an existing Contact Center Insights view.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region ID (for example, 'us-central1').
 * @param {string} viewId - The server-generated ID of the Contact Center Insights view to retrieve.
 */
async function getView(projectId, locationId, viewId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/views/${viewId}`;

    const request = {
      name,
    };

    const [view] = await client.getView(request);

    console.log(`View retrieved: ${view.name}`);
    console.log(`Display Name: ${view.displayName}`);
    console.log(`Filter Value: ${view.value}`);
    console.log(`Create Time: ${view.createTime?.seconds}`);
    console.log(`Update Time: ${view.updateTime?.seconds}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`View not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing view: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { getView };
// [END contactcenterinsights_v1_contactcenterinsights_view_get]
