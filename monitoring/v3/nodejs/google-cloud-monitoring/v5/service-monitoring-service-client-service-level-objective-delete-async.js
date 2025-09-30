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

// [START monitoring_v3_servicemonitoringservice_servicelevelobjective_delete_async]
const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Deletes a Service Level Objective (SLO).
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} serviceId The ID of the service (for example, 'your-service')
 * @param {string} sloId The ID of the Service Level Objective to delete (for example, 'your-slo')
 */
async function deleteServiceLevelObjective(
  projectId,
  serviceId = 'your-service',
  sloId = 'your-slo',
) {
  const name = client.projectServiceServiceLevelObjectivePath(
    projectId,
    serviceId,
    sloId,
  );

  const request = {
    name,
  };

  try {
    await client.deleteServiceLevelObjective(request);
    console.log(`Service Level Objective ${sloId} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Service Level Objective ${sloId} not found under service ${serviceId} in project ${projectId}. It may have already been deleted or never existed.`,
      );
    } else {
      console.error('Failed to delete Service Level Objective:', err.message);
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_servicelevelobjective_delete_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(
      `This script requires 3 arguments, but received ${args.length}.`,
    );
  }
  await deleteServiceLevelObjective(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      'Usage: node service-monitoring-service-client-service-level-objective-delete-async.js <projectId> <serviceId> <sloId>',
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {deleteServiceLevelObjective};
