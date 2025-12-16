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

// [START monitoring_v3_servicemonitoringservice_servicelevelobjective_get_async]
const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Gets a Service Level Objective (SLO) by its name.
 *
 * A Service Level Objective (SLO) defines a target level for a service's
 * reliability and performance, measured over a specific period.
 * This sample demonstrates how to retrieve an existing SLO.
 *
 * @param {string} projectId Your Google Cloud Project ID. (for example, 'example-project-id')
 * @param {string} serviceId The ID of the service that the SLO belongs to. (for example, 'your-service')
 * @param {string} sloId The ID of the Service Level Objective to retrieve. (for example, 'your-slo')
 */
async function getServiceLevelObjective(
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
    const [slo] = await client.getServiceLevelObjective(request);
    console.log(slo.name);
    if (slo.calendarPeriod) {
      console.log('	Period Type: Calendar Period');
      console.log(`	Calendar Period: ${slo.calendarPeriod}`);
    }
    console.log(`	Display Name: ${slo.displayName}`);
    console.log(`	Goal: ${slo.goal}`);
    if (slo.rollingPeriod) {
      console.log('	Period Type: Rolling Period');
      console.log(
        `	Rolling Period Duration: ${slo.rollingPeriod.seconds} seconds`,
      );
    }
    if (slo.serviceLevelIndicator) {
      console.log('	Service Level Indicator (SLI) details:');
      if (slo.serviceLevelIndicator.basicSli) {
        console.log('		Type: Basic SLI');
        const basicSli = slo.serviceLevelIndicator.basicSli;
        if (basicSli.availability) {
          console.log('		Criteria: Availability');
        } else if (basicSli.latency && basicSli.latency.threshold) {
          console.log(
            `		Criteria: Latency (threshold: ${basicSli.latency.threshold.seconds}s)`,
          );
        }
      } else if (slo.serviceLevelIndicator.requestBased) {
        console.log('		Type: Request Based SLI');
      } else if (slo.serviceLevelIndicator.windowsBased) {
        console.log('		Type: Windows Based SLI');
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Service Level Objective '${sloId}' not found for service '${serviceId}' in project '${projectId}'.`,
      );
      console.error(
        'Make sure the project ID, service ID, and SLO ID are correct and the SLO exists.',
      );
    } else {
      console.error(
        `Error getting Service Level Objective '${sloId}':`,
        err.message,
      );
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_servicelevelobjective_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(
      `This script requires 3 arguments, but received ${args.length}.`,
    );
  }
  await getServiceLevelObjective(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`
To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID (for example, 'example-project-id')
 - Service ID (for example, 'your-service-id')
 - Service Level Objective ID (for example, 'your-slo-id')

Example:
  node service-monitoring-service-client-service-level-objective-get-async.js example-project-id your-service your-slo
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getServiceLevelObjective,
};
