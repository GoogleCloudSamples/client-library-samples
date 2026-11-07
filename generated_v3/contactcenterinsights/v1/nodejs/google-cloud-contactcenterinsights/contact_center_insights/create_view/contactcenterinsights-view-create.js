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

// [START contactcenterinsights_v1_contactcenterinsights_view_create]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Creates a Contact Center Insights view.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region ID (for example, 'us-central1').
 */
async function createView(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const view = {
      displayName: 'Example View',
      value: 'medium="PHONE_CALL"',
    };

    const request = {
      parent,
      view,
    };

    const [response] = await client.createView(request);

    console.log(`Created view: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    console.log(`Filter value: ${response.value}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`The view already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid view configuration provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create view: ${err.message}`);
    }
  }
}

module.exports = { createView };
// [END contactcenterinsights_v1_contactcenterinsights_view_create]
