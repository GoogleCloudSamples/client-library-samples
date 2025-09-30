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

// [START monitoring_v3_servicemonitoringservice_servicelevelobjective_create_async]
const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Creates a Service Level Objective (SLO) for a given service.
 *
 * A Service Level Objective (SLO) describes a level of desired good service.
 * It consists of a service-level indicator (SLI), a performance goal, and a period
 * over which the objective is to be evaluated against that goal.
 *
 * @param {string} projectId Your Google Cloud Project ID.
 * @param {string} [serviceId='example-service'] The ID of the service to create the SLO for.
 *     (for example, 'your-service-123')
 * @param {string} [sloId='your-latency-slo'] The ID for the new Service Level Objective.
 *     (for example, 'your-latency-slo')
 */
async function createServiceLevelObjective(
  projectId,
  serviceId = 'example-service',
  sloId = 'your-latency-slo',
) {
  const parent = `projects/${projectId}/services/${serviceId}`;

  const serviceLevelObjective = {
    displayName: 'My Latency SLO',
    goal: 0.99, // 99% of requests must meet the criteria
    rollingPeriod: {
      seconds: 86400 * 7, // 7 days in seconds
    },
    serviceLevelIndicator: {
      requestBased: {
        goodTotalRatio: {
          goodServiceFilter:
            'metric.type="logging.googleapis.com/log_entry_count" AND resource.type="gce_instance" AND metric.labels.severity!="ERROR"',
          totalServiceFilter:
            'metric.type="logging.googleapis.com/log_entry_count" AND resource.type="gce_instance"',
        },
      },
    },
  };

  const request = {
    parent,
    serviceLevelObjectiveId: sloId,
    serviceLevelObjective,
  };

  try {
    const [response] = await client.createServiceLevelObjective(request);
    console.log(response.name);
    console.log(`	Display Name: ${response.displayName}`);
    console.log(`	Goal: ${response.goal}`);
    console.log(`	Rolling Period (seconds): ${response.rollingPeriod.seconds}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Service Level Objective '${sloId}' already exists for service '${serviceId}' in project '${projectId}'.`,
      );
      console.log(
        'Consider updating the existing SLO or choosing a different SLO ID.',
      );
    } else if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified service '${serviceId}' was not found in project '${projectId}'.`,
      );
      console.error(
        'Make sure the service exists before creating an SLO for it.',
      );
    } else {
      console.error('Error creating Service Level Objective:', err.message);
      if (err.details) {
        console.error('Error details:', err.details);
      }
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_servicelevelobjective_create_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(
      `This script requires 3 arguments, but received ${args.length}.`,
    );
  }
  await createServiceLevelObjective(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      'Usage: node service-monitoring-service-client-service-level-objective-create-async.js <projectId> [serviceId] [sloId]',
    );
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  createServiceLevelObjective,
};
