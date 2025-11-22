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

// [START monitoring_v3_metricservice_create_metric_descriptor_async]
const {MetricServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Creates a custom metric descriptor for a given project.
 *
 * This sample demonstrates how to define a custom metric with specific labels,
 * kind, value type, and unit, and then create it in Google Cloud Monitoring.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} metricType The full metric type name (for example, 'custom.googleapis.com/my_custom_metric')
 */
async function createMetricDescriptor(
  projectId,
  metricType = 'custom.googleapis.com/my_custom_metric',
) {
  const name = `projects/${projectId}`;

  const metricDescriptor = {
    type: metricType,
    metricKind: 'GAUGE', // GAUGE, DELTA, or CUMULATIVE
    valueType: 'DOUBLE', // INT64, DOUBLE, BOOL, STRING, MONEY, or DISTRIBUTION
    unit: 'By',
    description: 'A custom metric for demonstration purposes.',
    displayName: 'My Custom Metric',
    labels: [
      {
        key: 'environment',
        valueType: 'STRING',
        description:
          'The environment of the application (for example, "production", "staging").',
      },
      {
        key: 'region',
        valueType: 'STRING',
        description: 'The geographical region where the metric originated.',
      },
    ],
  };

  const request = {
    name,
    metricDescriptor,
  };

  try {
    const [descriptor] = client.createMetricDescriptor(request);
    console.log(descriptor.name);
    console.log('	Labels:');
    descriptor.labels.forEach(label => {
      console.log(`		- ${label.key} (${label.valueType}): ${label.description}`);
    });
    console.log(`	Metric Kind: ${descriptor.metricKind}`);
    console.log(`	Type: ${descriptor.type}`);
    console.log(`	Unit: ${descriptor.unit}`);
    console.log(`	Value Type: ${descriptor.valueType}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Metric descriptor '${metricType}' already exists in project '${projectId}'.`,
      );
      console.log(
        'Consider updating it if needed, but note that labels cannot be removed.',
      );
    } else {
      console.error('Failed to create metric descriptor:', err.message);
    }
  }
}
// [END monitoring_v3_metricservice_create_metric_descriptor_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await createMetricDescriptor(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command line, provide the following arguments:
  - Google Cloud Project like 'example-project-168'
  - Metric Type like 'custom.googleapis.com/my_custom_metric'

  Usage:

   node metric-service-client-metric-descriptor-create-async.js example-project-168 custom.googleapis.com/my_custom_metric`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {createMetricDescriptor};
