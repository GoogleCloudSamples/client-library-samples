// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START monitoring_v3_servicemonitoringservice_servicelevelobjective_update]
'use strict';

const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Updates a ServiceLevelObjective with a new display name.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} serviceId - The identifier of the parent Service.
 * @param {string} serviceLevelObjectiveId - The identifier of the ServiceLevelObjective to update.
 */
async function updateServiceLevelObjective(projectId, serviceId, serviceLevelObjectiveId) {
  try {
    const serviceLevelObjective = {
      name: client.projectServiceServiceLevelObjectivePath(
        projectId,
        serviceId,
        serviceLevelObjectiveId
      ),
      displayName: 'Updated Service Level Objective',
    };

    const updateMask = {
      paths: ['display_name'],
    };

    const [response] = await client.updateServiceLevelObjective({
      serviceLevelObjective,
      updateMask,
    });

    console.log(`Updated Service Level Objective: ${response.name}`);
    console.log(`Display Name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service Level Objective not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update Service Level Objective: ${err.message}`);
    }
  }
}

module.exports = { updateServiceLevelObjective };
// [END monitoring_v3_servicemonitoringservice_servicelevelobjective_update]
