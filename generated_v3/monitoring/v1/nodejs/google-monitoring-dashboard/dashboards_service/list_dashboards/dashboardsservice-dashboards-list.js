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

// [START monitoring_v1_dashboardsservice_dashboards_list]
'use strict';

const {DashboardsServiceClient} = require('@google-cloud/monitoring-dashboards');
const {status} = require('@grpc/grpc-js');

const client = new DashboardsServiceClient();

/**
 * Lists dashboards in a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID whose dashboards should be listed.
 */
async function listDashboards(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [dashboards] = await client.listDashboards(request);

    for (const dashboard of dashboards) {
      console.log(`Dashboard ID: ${dashboard.name}`);
      console.log(`Display Name: ${dashboard.displayName}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing project dashboards: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error listing dashboards: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listDashboards };
// [END monitoring_v1_dashboardsservice_dashboards_list]
