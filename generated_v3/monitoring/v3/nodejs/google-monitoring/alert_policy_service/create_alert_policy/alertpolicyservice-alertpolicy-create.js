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

// [START monitoring_v3_alertpolicyservice_alertpolicy_create]
'use strict';

const {AlertPolicyServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new AlertPolicyServiceClient();

/**
 * Use the createAlertPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID where the alert policy will be created.
 */
async function createAlertPolicy(projectId) {
  try {
    const name = `projects/${projectId}`;

    const aggregation = {
      alignmentPeriod: {seconds: 60},
      perSeriesAligner: 'ALIGN_MEAN',
    };

    const conditionThreshold = {
      filter:
        'metric.type="compute.googleapis.com/instance/cpu/utilization" AND resource.type="gce_instance"',
      comparison: 'COMPARISON_GT',
      thresholdValue: 0.8,
      duration: {seconds: 300},
      trigger: {count: 1},
      aggregations: [aggregation],
    };

    const condition = {
      displayName: 'CPU utilization exceeds threshold',
      conditionThreshold,
    };

    const alertPolicy = {
      displayName: 'High CPU Utilization Policy',
      combiner: 'AND',
      conditions: [condition],
    };

    const request = {
      name,
      alertPolicy,
    };

    const [createdPolicy] = await client.createAlertPolicy(request);
    console.log(`Created alert policy: ${createdPolicy.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Alert policy already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error creating alert policy: ${err.message}`);
    }
  }
}

module.exports = { createAlertPolicy };
// [END monitoring_v3_alertpolicyservice_alertpolicy_create]
