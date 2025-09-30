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

// [START monitoring_v3_metricservice_monitoredresourcedescriptor_get_async]
const {MetricServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Gets a single monitored resource descriptor for a given project and resource type.
 * This function demonstrates how to retrieve details about a specific monitored resource type,
 * such as `gce_instance`, which describes a Google Compute Engine virtual machine instance.
 *
 * @param {string} projectId Your Google Cloud Project ID. (For example, 'example-project-id')
 * @param {string} resourceType The type of the monitored resource descriptor to retrieve. (For example, 'gce_instance')
 */
async function getMonitoredResourceDescriptor(
  projectId,
  resourceType = 'gce_instance',
) {
  const name = client.projectMonitoredResourceDescriptorPath(
    projectId,
    resourceType,
  );

  const request = {
    name,
  };

  try {
    const [monitoredResourceDescriptor] =
      await client.getMonitoredResourceDescriptor(request);
    console.log(monitoredResourceDescriptor.name);
    console.log(`	Description: ${monitoredResourceDescriptor.description}`);
    console.log(`	Display Name: ${monitoredResourceDescriptor.displayName}`);
    if (
      monitoredResourceDescriptor.labels &&
      monitoredResourceDescriptor.labels.length > 0
    ) {
      console.log('	Labels:');
      monitoredResourceDescriptor.labels.forEach(label => {
        console.log(`		- ${label.key}: ${label.description}`);
      });
    } else {
      console.log('	No labels found for this resource type.');
    }
    console.log(`	Type: ${monitoredResourceDescriptor.type}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Monitored resource descriptor '${resourceType}' not found in project '${projectId}'.`,
      );
      console.error(
        'Make sure the resource type exists and is correctly spelled.',
      );
    } else {
      console.error(
        `Failed to retrieve monitored resource descriptor: ${err.message}`,
      );
    }
  }
}
// [END monitoring_v3_metricservice_monitoredresourcedescriptor_get_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getMonitoredResourceDescriptor(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project ID like 'example-project-id'
 - Monitored Resource Type like 'gce_instance'

Usage:

 node getMonitoredResourceDescriptor.js example-project-id gce_instance
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getMonitoredResourceDescriptor,
};
