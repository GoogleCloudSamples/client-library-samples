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

// [START monitoring_v3_servicemonitoringservice_servicelevelobjectives_list_async]
const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Lists all Service Level Objectives (SLOs) for a given service.
 *
 * @param {string} [projectId='example-project-id'] Your Google Cloud Project ID.
 *     Example: 'example-project-id'
 * @param {string} [serviceId='your-service-id'] The ID of the service for which to list SLOs.
 *     Example: 'your-app-service'
 */
async function listServiceLevelObjectivesSample(
  projectId,
  serviceId = 'your-service-id',
) {
  const parent = `projects/${projectId}/services/${serviceId}`;

  const request = {
    parent,
  };

  try {
    const [serviceLevelObjectives] =
      await client.listServiceLevelObjectives(request);
    if (serviceLevelObjectives.length === 0) {
      console.log(
        `No SLOs found for service "${serviceId}" in project "${projectId}".`,
      );
      return;
    }

    console.log(`Service Level Objectives for service "${serviceId}":`);
    for (const slo of serviceLevelObjectives) {
      console.log(`	Name: ${slo.name}`);
      if (slo.calendarPeriod) {
        console.log(`	Calendar Period: ${slo.calendarPeriod}`);
      }
      console.log(`	Display Name: ${slo.displayName || 'N/A'}`);
      console.log(`	Goal: ${slo.goal}`);
      if (slo.rollingPeriod && slo.rollingPeriod.seconds) {
        console.log(`	Rolling Period (seconds): ${slo.rollingPeriod.seconds}`);
      }
      if (slo.serviceLevelIndicator) {
        if (slo.serviceLevelIndicator.requestBased) {
          const goodServiceFilter =
            slo.serviceLevelIndicator.requestBased.goodTotalRatio
              ?.goodServiceFilter || 'N/A';
          const totalServiceFilter =
            slo.serviceLevelIndicator.requestBased.goodTotalRatio
              ?.totalServiceFilter || 'N/A';
          console.log(
            `	SLI Type: Request-based (Good: ${goodServiceFilter}, Total: ${totalServiceFilter})`,
          );
        } else if (slo.serviceLevelIndicator.windowsBased) {
          console.log('	SLI Type: Windows-based');
        }
      }
      console.log('---');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The service "${serviceId}" or project "${projectId}" was not found or is inaccessible.`,
      );
      console.error(
        'Make sure the project ID and service ID are correct, the service exists, and the authenticated account has permissions to access it.',
      );
    } else {
      console.error('Error listing Service Level Objectives:', err.message);
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_servicelevelobjectives_list_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await listServiceLevelObjectivesSample(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      'Usage: node service-monitoring-service-client-service-level-objectives-list-async.js <PROJECT_ID> <SERVICE_ID>',
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listServiceLevelObjectivesSample,
};
