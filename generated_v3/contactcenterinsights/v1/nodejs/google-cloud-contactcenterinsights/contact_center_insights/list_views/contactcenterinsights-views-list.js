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

// [START contactcenterinsights_v1_contactcenterinsights_views_list]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Lists views for the specified project and location.
 */
async function listViews() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = client.locationPath(projectId, location);

    const request = {
      parent,
    };

    // The API returns an array of View objects matching the request
    const [views] = await client.listViews(request);
    for (const view of views) {
      console.log(`View name: ${view.name}`);
      console.log(`Display name: ${view.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listViews };
// [END contactcenterinsights_v1_contactcenterinsights_views_list]
