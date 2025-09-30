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

// [START monitoring_v3_metricservice_metricdescriptor_delete_async]
const {MetricServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Deletes a custom metric descriptor.
 * Only user-created custom metrics can be deleted.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} metricId The ID of the custom metric to delete
 *   (for example, 'custom.googleapis.com/my_test_metric').
 */
async function deleteMetricDescriptor(
  projectId,
  metricId = 'custom.googleapis.com/my_test_metric',
) {
  const name = client.projectMetricDescriptorPath(projectId, metricId);

  const request = {
    name,
  };

  try {
    await client.deleteMetricDescriptor(request);
    console.log(`Metric descriptor ${name} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Metric descriptor ${name} not found. It might have been deleted already or never existed.`,
      );
    } else {
      console.error('Error deleting metric descriptor:', err.message);
    }
  }
}
// [END monitoring_v3_metricservice_metricdescriptor_delete_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await deleteMetricDescriptor(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Metric ID like 'custom.googleapis.com/my_test_metric'

  Usage:

   node metric-service-client-metric-descriptor-delete-async.js example-project-168 custom.googleapis.com/my_test_metric`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {deleteMetricDescriptor};
