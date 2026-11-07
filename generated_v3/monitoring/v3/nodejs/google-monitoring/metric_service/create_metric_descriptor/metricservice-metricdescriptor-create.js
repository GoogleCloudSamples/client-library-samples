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

// [START monitoring_v3_metricservice_metricdescriptor_create]
'use strict';

const {MetricServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Use the createMetricDescriptor method
 *
 * @param {string} projectId - The Google Cloud project ID on which to create the metric descriptor.
 */
async function createMetricDescriptor(projectId) {
  try {
    const name = client.projectPath(projectId);
    const metricDescriptor = {
      description: 'Daily volume of store transactions.',
      displayName: 'Daily Volume',
      type: 'custom.googleapis.com/stores/daily_volume',
      metricKind: 'GAUGE',
      valueType: 'DOUBLE',
      unit: '{transactions}',
    };

    const request = {
      name,
      metricDescriptor,
    };

    const [response] = await client.createMetricDescriptor(request);
    console.log(`Created metric descriptor: ${response.name}`);
    console.log(`Type: ${response.type}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Metric descriptor already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid metric descriptor argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createMetricDescriptor };
// [END monitoring_v3_metricservice_metricdescriptor_create]
