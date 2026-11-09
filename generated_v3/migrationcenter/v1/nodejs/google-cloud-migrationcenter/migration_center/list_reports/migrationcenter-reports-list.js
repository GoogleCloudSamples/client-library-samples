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

// [START migrationcenter_v1_migrationcenter_reports_list]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Lists reports for an existing ReportConfig in Migration Center.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region) where the report config is located.
 * @param {string} reportConfigId - The user-specified ID of the ReportConfig whose reports are listed.
 */
async function listReports(projectId, locationId, reportConfigId) {
  const parent = `projects/${projectId}/locations/${locationId}/reportConfigs/${reportConfigId}`;

  try {
    const [reports] = await client.listReports({parent});

    if (reports.length === 0) {
      console.log(`No reports found for ${parent}.`);
      return;
    }

    for (const report of reports) {
      console.log(`Report name: ${report.name}`);
      console.log(`State: ${report.state}`);
      console.log(`Type: ${report.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Report config not found: ${parent}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing reports for: ${parent}`);
    } else {
      console.error(`Failed to list reports: ${err.message}`);
    }
  }
}

module.exports = { listReports };
// [END migrationcenter_v1_migrationcenter_reports_list]
