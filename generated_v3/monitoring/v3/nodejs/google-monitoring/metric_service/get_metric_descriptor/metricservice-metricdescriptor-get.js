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

// [START monitoring_v3_metricservice_metricdescriptor_get]
'use strict';

const {MetricServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Use the getMetricDescriptor method
 *
 * @param {string} metricDescriptorId - The metric descriptor identifier or metric type (for example, 'compute.googleapis.com/instance/disk/read_bytes_count' or 'custom.googleapis.com/my_metric').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getMetricDescriptor(metricDescriptorId, projectId) {
  try {
    const name = `projects/${projectId}/metricDescriptors/${metricDescriptorId}`;
    const request = {
      name,
    };

    const [metricDescriptor] = await client.getMetricDescriptor(request);

    console.log(`Metric descriptor: ${metricDescriptor.name}`);
    console.log(`Type: ${metricDescriptor.type}`);
    console.log(`Metric kind: ${metricDescriptor.metricKind}`);
    console.log(`Value type: ${metricDescriptor.valueType}`);
    console.log(`Unit: ${metricDescriptor.unit}`);
    console.log(`Description: ${metricDescriptor.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Metric descriptor not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing metric descriptor: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getMetricDescriptor };
// [END monitoring_v3_metricservice_metricdescriptor_get]
