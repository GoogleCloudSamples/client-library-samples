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

// [START storageinsights_v1_storageinsights_reportdetail_get]
'use strict';

const {StorageInsightsClient} = require('@google-cloud/storageinsights');
const {status} = require('@grpc/grpc-js');

const client = new StorageInsightsClient();

/**
 * Use the getReportDetail method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the ReportConfig and ReportDetail.
 * @param {string} reportConfigId - The server-generated ID of the ReportConfig. Retrieve this from an existing ReportConfig resource (e.g., from ListReportConfigs).
 * @param {string} reportDetailId - The server-generated ID of the ReportDetail. Retrieve this from an existing ReportDetail resource (e.g., from ListReportDetails).
 */
async function getReportDetail(projectId, locationId, reportConfigId, reportDetailId) {
  try {
    // Construct the fully qualified resource name for the report detail
    const name = `projects/${projectId}/locations/${locationId}/reportConfigs/${reportConfigId}/reportDetails/${reportDetailId}`;

    const request = {
      name,
    };

    const [response] = await client.getReportDetail(request);
    console.log(`Retrieved report detail: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Report detail resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing report detail: ${err.message}`);
    } else {
      console.error(`Failed to retrieve report detail: ${err.message}`);
    }
  }
}

module.exports = { getReportDetail };
// [END storageinsights_v1_storageinsights_reportdetail_get]
