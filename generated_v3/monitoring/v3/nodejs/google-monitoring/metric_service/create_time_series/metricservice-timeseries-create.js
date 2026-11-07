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

// [START monitoring_v3_metricservice_timeseries_create]
'use strict';

const {MetricServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Writes time series data to Cloud Monitoring.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function createTimeSeries(projectId) {
  try {
    const name = `projects/${projectId}`;

    const endTime = {
      seconds: Math.floor(Date.now() / 1000),
    };

    const point = {
      interval: {
        endTime,
      },
      value: {
        int64Value: 123,
      },
    };

    const resourceLabels = {
      project_id: projectId,
    };

    const singleTimeSeries = {
      metric: {
        type: 'custom.googleapis.com/sample_metric',
      },
      resource: {
        type: 'global',
        labels: resourceLabels,
      },
      metricKind: 'GAUGE',
      valueType: 'INT64',
      points: [point],
    };

    const timeSeries = [singleTimeSeries];

    const request = {
      name,
      timeSeries,
    };

    await client.createTimeSeries(request);
    console.log(`Created time series data for ${name}.`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid time series data provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while writing time series: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (status ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createTimeSeries };
// [END monitoring_v3_metricservice_timeseries_create]
