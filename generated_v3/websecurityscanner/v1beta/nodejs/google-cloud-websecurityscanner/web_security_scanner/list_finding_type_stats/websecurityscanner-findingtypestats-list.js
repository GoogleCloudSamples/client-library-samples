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

// [START websecurityscanner_v1beta_websecurityscanner_findingtypestats_list]
'use strict';

const {WebSecurityScannerClient} = require('@google-cloud/web-security-scanner');
const {status} = require('@grpc/grpc-js');

const client = new WebSecurityScannerClient();

/**
 * Use the listFindingTypeStats method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} scanConfigId - ID of the ScanConfig (for example, 'example-scanconfig-id')
 * @param {string} scanRunId - ID of the ScanRun (for example, 'example-scanrun-id')
 */
async function listFindingTypeStats(projectId, scanConfigId, scanRunId) {
  try {
    const parent = `projects/${projectId}/scanConfigs/${scanConfigId}/scanRuns/${scanRunId}`;
    const request = {
      parent,
    };

    const [response] = await client.listFindingTypeStats(request);
    const findingTypeStats = response.findingTypeStats || [];

    console.log(`Retrieved ${findingTypeStats.length} finding type statistics.`);
    for (const stat of findingTypeStats) {
      console.log(`Finding type: ${stat.findingType}, Count: ${stat.findingCount}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error occurred (status ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listFindingTypeStats };
// [END websecurityscanner_v1beta_websecurityscanner_findingtypestats_list]
