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

// [START monitoring_v3_servicemonitoringservice_servicelevelobjective_update_async]
const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Updates an existing Service Level Objective (SLO) with a new display name.
 *
 * Service Level Objectives (SLOs) define the desired level of service for a given service.
 * This sample demonstrates how to modify an existing SLO by updating its display name.
 * Updating an SLO allows you to refine its presentation without changing its underlying
 * performance measurement criteria.
 *
 * @param {string} projectId Your Google Cloud Project ID. (for example, 'example-project-id')
 * @param {string} serviceId The ID of the service to which the SLO belongs. (for example, 'your-service')
 * @param {string} sloId The ID of the Service Level Objective to update. (for example, 'your-slo')
 */
async function updateServiceLevelObjective(
  projectId,
  serviceId = 'your-service',
  sloId = 'your-slo',
) {
  const name = client.projectServiceServiceLevelObjectivePath(
    projectId,
    serviceId,
    sloId,
  );

  const serviceLevelObjective = {
    name,
    displayName: 'My Updated SLO Name',
  };

  const updateMask = {
    paths: ['display_name'],
  };

  const request = {
    serviceLevelObjective,
    updateMask,
  };

  try {
    const [updatedSlo] = await client.updateServiceLevelObjective(request);

    console.log(updatedSlo.name);
    console.log(`	New Display Name: ${updatedSlo.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Service Level Objective ${sloId} not found. Make sure the project, service, and SLO IDs are correct.`,
      );
    } else {
      console.error('Error updating Service Level Objective:', err.message);
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_servicelevelobjective_update_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(
      `This script requires 3 arguments, but received ${args.length}.`,
    );
  }

  const projectId = args[0];
  const serviceId = args[1];
  const sloId = args[2];

  await updateServiceLevelObjective(projectId, serviceId, sloId);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID like 'example-project-id'
 - Service ID like 'your-service'
 - SLO ID like 'your-slo'

Usage:

 node service-monitoring-service-client-service-level-objective-update-async.js example-project-id your-service your-slo
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {updateServiceLevelObjective};
