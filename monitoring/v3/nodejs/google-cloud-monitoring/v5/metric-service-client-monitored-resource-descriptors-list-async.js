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

// [START monitoring_v3_metricservice_monitoredresourcedescriptors_list_async]
const {MetricServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Lists monitored resource descriptors available in the specified project.
 * Monitored resource descriptors define the kinds of resources that can be
 * monitored by Google Cloud Monitoring, such as `gce_instance` for a Compute Engine VM.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 */
async function listMonitoredResourceDescriptors(projectId) {
  const request = {
    name: `projects/${projectId}`,
  };

  try {
    for await (const descriptor of client.listMonitoredResourceDescriptorsAsync(
      request,
    )) {
      console.log(descriptor.name);
      console.log(`	Description: ${descriptor.description}`);
      console.log(`	Display Name: ${descriptor.displayName}`);
      if (descriptor.labels && descriptor.labels.length > 0) {
        console.log('	Labels:');
        for (const label of descriptor.labels) {
          console.log(`		- Key: ${label.key}, Description: ${label.description}`);
        }
      }
      console.log(`	Type: ${descriptor.type}`);
      console.log('---');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' not found. Make sure the project ID is correct.`,
      );
    } else {
      console.error(
        'Error listing monitored resource descriptors:',
        err.message,
      );
    }
  }
}
// [END monitoring_v3_metricservice_monitoredresourcedescriptors_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await listMonitoredResourceDescriptors(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify one argument:
  - Google Cloud Project like 'example-project-168'

  Usage:

   node metric-service-client-monitored-resource-descriptors-list-async.js example-project-168
`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {listMonitoredResourceDescriptors};
