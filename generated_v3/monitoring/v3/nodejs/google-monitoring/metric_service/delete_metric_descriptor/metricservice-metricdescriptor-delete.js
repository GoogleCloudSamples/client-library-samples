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

// [START monitoring_v3_metricservice_metricdescriptor_delete]
'use strict';

const {MetricServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new MetricServiceClient();

/**
 * Use the deleteMetricDescriptor method
 *
 * @param {string} metricDescriptorId - The identifier of the custom metric descriptor to delete (for example, 'custom.googleapis.com/my_test_metric'). Only user-created custom metrics can be deleted.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function deleteMetricDescriptor(metricDescriptorId, projectId) {
  const name = `projects/${projectId}/metricDescriptors/${metricDescriptorId}`;

  try {
    const request = {
      name,
    };

    await client.deleteMetricDescriptor(request);
    console.log(`Deleted metric descriptor: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Metric descriptor not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when deleting metric descriptor: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cannot delete system metric descriptor: ${name}`);
    } else {
      console.error(`Failed to delete metric descriptor: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteMetricDescriptor };
// [END monitoring_v3_metricservice_metricdescriptor_delete]
