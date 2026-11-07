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

// [START monitoring_v3_servicemonitoringservice_servicelevelobjective_create]
'use strict';

const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Creates a Service Level Objective for a monitored Service.
 *
 * @param {string} serviceId - The ID of the monitored Service.
 * @param {string} serviceLevelObjectiveId - The client-assigned identifier for the ServiceLevelObjective.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function createServiceLevelObjective(serviceId, serviceLevelObjectiveId, projectId) {
  try {
    const parent = `projects/${projectId}/services/${serviceId}`;

    const basicSli = {
      availability: {},
    };

    let serviceLevelIndicator = {
      basicSli,
    };

    const rollingPeriod = {
      seconds: 86400,
    };

    let serviceLevelObjective = {
      displayName: 'Availability SLO',
      goal: 0.99,
      rollingPeriod,
      serviceLevelIndicator,
    };

    const request = {
      parent,
      serviceLevelObjectiveId,
      serviceLevelObjective,
    };

    let response;
    try {
      [response] = await client.createServiceLevelObjective(request);
    } catch (err) {
      // Services of type CUSTOM do not support basic SLIs; fall back to request-based SLI.
      if (err.code === status.INVALID_ARGUMENT && err.message && err.message.includes('CUSTOM')) {
        const goodTotalRatio = {
          totalServiceFilter:
            'metric.type="logging.googleapis.com/log_entry_count" resource.type="global"',
          goodServiceFilter:
            'metric.type="logging.googleapis.com/log_entry_count" resource.type="global"',
        };
        serviceLevelIndicator = {
          requestBased: {
            goodTotalRatio,
          },
        };
        serviceLevelObjective = {
          displayName: 'Availability SLO',
          goal: 0.99,
          rollingPeriod,
          serviceLevelIndicator,
        };
        [response] = await client.createServiceLevelObjective({
          parent,
          serviceLevelObjectiveId,
          serviceLevelObjective,
        });
      } else {
        throw err;
      }
    }

    console.log(`Created Service Level Objective: ${response.name}`);
    console.log(`Display Name: ${response.displayName}`);
    console.log(`Goal: ${response.goal}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service Level Objective already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Specified resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create Service Level Objective: ${err.message}`);
    }
  }
}

module.exports = { createServiceLevelObjective };
// [END monitoring_v3_servicemonitoringservice_servicelevelobjective_create]
