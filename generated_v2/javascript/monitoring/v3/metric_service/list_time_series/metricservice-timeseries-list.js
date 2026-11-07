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

// [START monitoring_v3_metricservice_timeseries_list]
'use strict';

const {MetricServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Use the listTimeSeries method
 *
 * @param {string} projectId - The Google Cloud project ID on which to execute the request.
 */
async function listTimeSeries(projectId) {
  try {
    const view = 'FULL';
    const now = Math.floor(Date.now() / 1000);
    const interval = {
      startTime: {
        seconds: now - 20 * 60,
      },
      endTime: {
        seconds: now,
      },
    };
    const filter = 'metric.type = "compute.googleapis.com/instance/cpu/utilization"';
    const name = `projects/${projectId}`;

    const request = {
      name,
      filter,
      interval,
      view,
    };

    const [timeSeries] = await client.listTimeSeries(request);

    for (const series of timeSeries) {
      console.log(`Metric: ${series.metric.type}`);
      console.log(`Resource: ${series.resource.type}`);
      console.log(`Points retrieved: ${series.points ? series.points.length : 0}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API request failed: ${err.message}`);
    }
  }
}

module.exports = { listTimeSeries };
// [END monitoring_v3_metricservice_timeseries_list]
