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

// [START monitoring_v1_dashboardsservice_dashboard_update]
'use strict';

const {DashboardsServiceClient} = require('@google-cloud/monitoring-dashboards');
const {status} = require('@grpc/grpc-js');

const client = new DashboardsServiceClient();

/**
 * Use the updateDashboard method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} dashboardId - The ID of the existing dashboard to update. This is server-generated upon dashboard creation.
 */
async function updateDashboard(projectId, dashboardId) {
  try {
    const dashboardName = client.dashboardPath(projectId, dashboardId);

    // Retrieve existing dashboard to preserve etag, layout, and widgets
    const [existingDashboard] = await client.getDashboard({
      name: dashboardName,
    });

    const dashboard = {
      ...existingDashboard,
      displayName: `${existingDashboard.displayName} (Updated)`,
    };

    const [updatedDashboard] = await client.updateDashboard({
      dashboard,
    });

    console.log(`Updated dashboard name: ${updatedDashboard.name}`);
    console.log(`Updated display name: ${updatedDashboard.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Dashboard not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed during dashboard update: ${err.message}`);
    } else {
      console.error(`Dashboard update failed: ${err.message}`);
    }
  }
}

module.exports = { updateDashboard };
// [END monitoring_v1_dashboardsservice_dashboard_update]
