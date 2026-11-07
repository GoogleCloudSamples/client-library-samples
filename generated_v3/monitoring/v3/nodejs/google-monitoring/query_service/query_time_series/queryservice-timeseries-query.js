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

// [START monitoring_v3_queryservice_query_time_series]
'use strict';

const {QueryServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new QueryServiceClient();

/**
 * Use the queryTimeSeries method
 *
 * @param {string} projectId - The Google Cloud project ID on which to execute the time series query.
 */
async function queryTimeSeries(projectId) {
  try {
    const query =
      'fetch gce_instance::compute.googleapis.com/instance/cpu/utilization | within 5m';
    const name = `projects/${projectId}`;

    const request = {
      name,
      query,
    };

    const [timeSeriesData] = await client.queryTimeSeries(request);

    console.log(`Retrieved ${timeSeriesData.length} time series data items.`);
    for (const item of timeSeriesData) {
      console.log(`Point count: ${item.pointData ? item.pointData.length : 0}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (typeof err.code === 'number') {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { queryTimeSeries };
// [END monitoring_v3_queryservice_query_time_series]
