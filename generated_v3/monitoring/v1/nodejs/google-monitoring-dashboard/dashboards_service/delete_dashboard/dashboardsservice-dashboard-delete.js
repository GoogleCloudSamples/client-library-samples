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

// [START monitoring_v1_dashboardsservice_dashboard_delete]
'use strict';

const {DashboardsServiceClient} = require('@google-cloud/monitoring-dashboards');
const {status} = require('@grpc/grpc-js');

const client = new DashboardsServiceClient();

/**
 * Use the deleteDashboard method
 *
 * @param {string} dashboardId - The server-generated ID of the dashboard to delete. Read this from an existing dashboard.
 * @param {string} projectId - The Google Cloud project ID where the dashboard is located.
 */
async function deleteDashboard(dashboardId, projectId) {
  const name = `projects/${projectId}/dashboards/${dashboardId}`;
  try {
    await client.deleteDashboard({name});
    console.log(`Deleted dashboard: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Dashboard not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when deleting dashboard: ${name}`);
    } else {
      console.error(`API error during dashboard deletion: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteDashboard };
// [END monitoring_v1_dashboardsservice_dashboard_delete]
