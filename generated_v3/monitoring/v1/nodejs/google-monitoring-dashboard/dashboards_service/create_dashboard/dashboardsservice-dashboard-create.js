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

// [START monitoring_v1_dashboardsservice_dashboard_create]
'use strict';

const {DashboardsServiceClient} = require('@google-cloud/monitoring-dashboards');
const {status} = require('@grpc/grpc-js');

const client = new DashboardsServiceClient();

/**
 * Use the createDashboard method
 *
 * @param {string} projectId - The Google Cloud project ID where the dashboard will be created.
 */
async function createDashboard(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const dashboard = {
      displayName: 'Example Dashboard',
      gridLayout: {},
    };

    const request = {
      parent,
      dashboard,
    };

    const [response] = await client.createDashboard(request);
    console.log(`Created dashboard: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Dashboard already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid dashboard configuration: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating dashboard: ${err.message}`);
    } else {
      console.error(`Failed to create dashboard: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { createDashboard };
// [END monitoring_v1_dashboardsservice_dashboard_create]
