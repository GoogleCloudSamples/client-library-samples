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

const process = require('process');

// [START monitoring_v3_metricservice_timeseries_list_async]
const {MetricServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Lists time series data for a given project and metric filter.
 *
 * This sample demonstrates how to retrieve time series data for a specific
 * metric and resource type within a Google Cloud project. It queries for
 * the 'logging.googleapis.com/log_entry_count' metric on 'gce_instance'
 * resources over the last 5 minutes.
 *
 * @param {string} projectId Your Google Cloud Project ID.
 */
async function listTimeSeriesData(projectId) {
  const name = `projects/${projectId}`;

  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const request = {
    name,
    filter: 'metric.type = "logging.googleapis.com/log_entry_count"',
    interval: {
      startTime: {
        seconds: Math.floor(twentyFourHoursAgo.getTime() / 1000),
      },
      endTime: {
        seconds: Math.floor(now.getTime() / 1000),
      },
    },
  };

  try {
    const [timeSeries] = await client.listTimeSeries(request);
    console.log('Time series data:');

    if (timeSeries.length === 0) {
      console.log('No time series found for the given filter and interval.');
      return;
    }

    timeSeries.forEach(ts => {
      console.log(`	Metric type: ${ts.metric.type}`);
      console.log('	Points:');
      ts.points.forEach(point => {
        const timestamp = new Date(
          point.interval.endTime.seconds * 1000 + // Convert seconds to milliseconds
            (point.interval.endTime.nanos || 0) / 1000000, // Convert nanos to milliseconds
        );

        const {int64Value, doubleValue, stringValue} = point.value;
        const value =
          int64Value ??
          doubleValue ??
          stringValue ??
          JSON.stringify(point.value);

        console.log(`		Timestamp: ${timestamp.toISOString()}, Value: ${value}`);
      });
      console.log('	Resource labels:');
      for (const key in ts.resource.labels) {
        console.log(`		${key}: ${ts.resource.labels[key]}`);
      }
      console.log(`	Resource type: ${ts.resource.type}`);
      console.log('---');
    });
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project ${projectId} not found or no matching time series data for the specified filter.`,
      );
      console.error(
        'Make sure the project ID is correct and there is monitoring data for the specified metric and resource type.',
      );
    } else {
      console.error('Error listing time series:', err);
    }
  }
}
// [END monitoring_v3_metricservice_timeseries_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await listTimeSeriesData(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify your Google Cloud Project ID:

Usage:

      node metric-service-client-time-series-list-async.js <YOUR_PROJECT_ID>`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {listTimeSeriesData};
