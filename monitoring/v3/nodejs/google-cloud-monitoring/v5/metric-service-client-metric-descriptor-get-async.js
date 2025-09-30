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

// [START monitoring_v3_metricservice_metricdescriptor_get_async]
const {MetricServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Gets a single metric descriptor.
 *
 * This sample demonstrates how to retrieve a specific metric descriptor,
 * which defines the metadata for a metric type, such as its name, labels,
 * unit, and value type.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} metricId The ID of the metric descriptor to retrieve (for example, 'compute.googleapis.com/instance/cpu/usage_time')
 */
async function getMetricDescriptor(
  projectId,
  metricId = 'compute.googleapis.com/instance/cpu/usage_time',
) {
  const name = client.projectMetricDescriptorPath(projectId, metricId);

  const request = {
    name,
  };

  try {
    const [metricDescriptor] = await client.getMetricDescriptor(request);
    console.log(metricDescriptor.name);
    console.log(`	Description: ${metricDescriptor.description}`);
    if (metricDescriptor.labels && metricDescriptor.labels.length > 0) {
      console.log('	Labels:');
      metricDescriptor.labels.forEach(label => {
        console.log(
          `		- Key: ${label.key}, Value Type: ${label.valueType}, Description: ${label.description}`,
        );
      });
    }
    console.log(`	Metric Kind: ${metricDescriptor.metricKind}`);
    console.log(`	Type: ${metricDescriptor.type}`);
    console.log(`	Value Type: ${metricDescriptor.valueType}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Metric descriptor '${metricId}' not found in project '${projectId}'. ` +
          'Make sure the metric ID is correct and exists in the project.',
      );
    } else {
      console.error('Error getting metric descriptor:', err);
    }
  }
}
// [END monitoring_v3_metricservice_metricdescriptor_get_async]

/**
 * Main function to be run from the command line.
 */
async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getMetricDescriptor(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Metric ID like 'compute.googleapis.com/instance/cpu/usage_time'

  Usage:

   node metric-service-client-metric-descriptor-get-async.js example-project-168 compute.googleapis.com/instance/cpu/usage_time`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getMetricDescriptor,
};
