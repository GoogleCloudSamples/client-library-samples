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

// [START migrationcenter_v1_migrationcenter_reportconfig_get]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the getReportConfig method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (e.g., "us-central1").
 * @param {string} reportConfigId - The user-specified ID of the ReportConfig. Must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.
 */
async function getReportConfig(projectId, locationId, reportConfigId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/reportConfigs/${reportConfigId}`;
    const [reportConfig] = await client.getReportConfig({name});

    console.log(`Report config name: ${reportConfig.name}`);
    console.log(`Display name: ${reportConfig.displayName}`);
    console.log(`Description: ${reportConfig.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Report config not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getReportConfig };
// [END migrationcenter_v1_migrationcenter_reportconfig_get]
