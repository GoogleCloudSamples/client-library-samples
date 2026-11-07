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

// [START monitoring_v1_dashboardsservice_dashboard_get]
'use strict';

const {DashboardsServiceClient} = require('@google-cloud/monitoring-dashboards');
const {status} = require('@grpc/grpc-js');

const client = new DashboardsServiceClient();

/**
 * Use the getDashboard method
 *
 * @param {string} dashboardId - The server-generated ID of the dashboard to retrieve (e.g. 'custom-dashboard-123'), obtained from DashboardsService.ListDashboards or DashboardsService.CreateDashboard.
 * @param {string} projectId - The Google Cloud project ID where the dashboard is located.
 */
async function getDashboard(dashboardId, projectId) {
  try {
    const name = `projects/${projectId}/dashboards/${dashboardId}`;
    const request = {
      name,
    };

    const [dashboard] = await client.getDashboard(request);

    console.log(`Retrieved dashboard: ${dashboard.displayName}`);
    console.log(`Resource name: ${dashboard.name}`);
    return dashboard;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Dashboard not found: projects/${projectId}/dashboards/${dashboardId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while retrieving dashboard.');
    } else {
      console.error(`Error retrieving dashboard: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getDashboard };
// [END monitoring_v1_dashboardsservice_dashboard_get]
