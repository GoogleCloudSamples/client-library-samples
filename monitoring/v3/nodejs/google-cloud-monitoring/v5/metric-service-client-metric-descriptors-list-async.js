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

// [START monitoring_v3_metricservice_metricdescriptors_list_async]
const {MetricServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Lists all metric descriptors for a given Google Cloud project.
 *
 * Metric descriptors define the type and format of a metric. This sample
 * demonstrates how to retrieve a list of these descriptors.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 */
async function listMetricDescriptors(projectId) {
  const request = {
    name: `projects/${projectId}`,
    filter: 'metric.type = starts_with("custom.googleapis.com/")',
  };

  try {
    const [metricDescriptors] = await client.listMetricDescriptors(request);

    if (metricDescriptors.length === 0) {
      console.log(`No metric descriptors found for project ${projectId}.`);
      return;
    }

    console.log('Metric Descriptors:');
    for (const descriptor of metricDescriptors) {
      console.log(`	Name: ${descriptor.name}`);
      console.log(`	Description: ${descriptor.description}`);
      console.log(`	DisplayName: ${descriptor.displayName}`);
      console.log('	Labels:');
      if (descriptor.labels && descriptor.labels.length > 0) {
        for (const label of descriptor.labels) {
          console.log(`		Key: ${label.key}, Description: ${label.description}`);
        }
      } else {
        console.log('		No labels defined.');
      }
      console.log(`	MetricKind: ${descriptor.metricKind}`);
      console.log(`	Type: ${descriptor.type}`);
      console.log(`	ValueType: ${descriptor.valueType}`);
      console.log('---');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' not found or you don't have permission to access it.`,
      );
      console.error(
        'Make sure the project ID is correct and your service account has the Monitoring Viewer role.',
      );
    } else {
      console.error('Error listing metric descriptors:', err.message);
    }
  }
}
// [END monitoring_v3_metricservice_metricdescriptors_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await listMetricDescriptors(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command line, provide the following argument:
  - Google Cloud Project like 'example-project-168'

  Usage:

   node metric-service-client-metric-descriptors-list-async.js example-project-168`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {listMetricDescriptors};
