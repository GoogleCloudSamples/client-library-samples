// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START monitoring_v3_metricservice_timeseries_create_async]
const {MetricServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

// Instantiates a client
const client = new MetricServiceClient();

/**
 * Creates a new time series for a custom metric.
 *
 * This sample demonstrates how to write a single data point to a custom metric.
 * For production applications, it's often more efficient to batch multiple
 * data points in a single call to `createTimeSeries`.
 *
 * If a metric descriptor for 'custom.googleapis.com/my_nodejs_sample_metric'
 * does not exist, it will be implicitly created by this operation.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 */
async function createTimeSeries(projectId) {
  const now = Date.now();
  const request = {
    name: `projects/${projectId}`,
    timeSeries: [
      {
        metric: {
          type: 'custom.googleapis.com/my_nodejs_sample_metric',
          labels: {
            environment: 'production',
            region: 'us-central1',
          },
        },
        resource: {
          type: 'global', // 'global' is a common monitored resource type for custom metrics
          labels: {
            project_id: projectId,
          },
        },
        // Explicitly setting metricKind and valueType, though they can be inferred
        // if the metric descriptor is auto-created.
        metricKind: 'GAUGE',
        valueType: 'DOUBLE',
        points: [
          {
            interval: {
              // For GAUGE metrics, startTime is optional and usually equals endTime.
              // For CUMULATIVE or DELTA, startTime and endTime define the interval.
              endTime: {
                seconds: Math.floor(now / 1000),
                nanos: (now % 1000) * 1e6,
              },
            },
            value: {
              doubleValue: Math.random() * 100, // Random double value between 0 and 100
            },
          },
        ],
      },
    ],
  };

  try {
    await client.createTimeSeries(request);
    console.log(
      'Successfully wrote time series data for custom metric: custom.googleapis.com/my_nodejs_sample_metric',
    );
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(
        `Error creating time series: Invalid argument. Please check your metric type, resource labels, and point values. Details: ${err.message}`,
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error creating time series: Permission denied. Ensure the service account has 'monitoring.metricWriter' role. Details: ${err.message}`,
      );
    } else {
      console.error('Error creating time series:', err);
    }
  }
}
// [END monitoring_v3_metricservice_timeseries_create_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await createTimeSeries(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify a Google Cloud Project ID.

Usage:

    node metric-service-client-time-series-create-async.js <YOUR_PROJECT_ID>`,
    );
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  createTimeSeries,
};
