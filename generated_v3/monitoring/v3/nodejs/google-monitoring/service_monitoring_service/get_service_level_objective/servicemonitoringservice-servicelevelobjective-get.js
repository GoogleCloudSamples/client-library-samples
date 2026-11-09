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

// [START monitoring_v3_servicemonitoringservice_servicelevelobjective_get]
'use strict';

const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Use the getServiceLevelObjective method
 *
 * @param {string} serviceId - The ID of the Service containing the ServiceLevelObjective. Caller-specified or server-generated; obtain from an existing Service resource.
 * @param {string} serviceLevelObjectiveId - The ID of the ServiceLevelObjective to retrieve. Caller-specified or server-generated; obtain from an existing ServiceLevelObjective resource.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getServiceLevelObjective(serviceId, serviceLevelObjectiveId, projectId) {
  try {
    const name = `projects/${projectId}/services/${serviceId}/serviceLevelObjectives/${serviceLevelObjectiveId}`;

    const request = {
      name,
    };

    const [response] = await client.getServiceLevelObjective(request);

    console.log(`Retrieved Service Level Objective: ${response.name}`);
    console.log(`Display Name: ${response.displayName}`);
    console.log(`Goal: ${response.goal}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service Level Objective not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getServiceLevelObjective };
// [END monitoring_v3_servicemonitoringservice_servicelevelobjective_get]
