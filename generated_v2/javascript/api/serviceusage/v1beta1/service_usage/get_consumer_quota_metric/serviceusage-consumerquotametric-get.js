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

// [START serviceusage_v1beta1_serviceusage_consumerquotametric_get]
'use strict';

const {ServiceUsageClient} = require('@google-cloud/service-usage').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new ServiceUsageClient();

/**
 * Retrieves consumer quota metric details for a specified service.
 */
async function getConsumerQuotaMetric() {
  try {
    const projectId = await client.getProjectId();
    const serviceName = 'compute.googleapis.com';
    const metricName = 'compute.googleapis.com%2Fcpus';

    const name = `projects/${projectId}/services/${serviceName}/consumerQuotaMetrics/${metricName}`;

    const request = {
      name,
    };

    const [response] = await client.getConsumerQuotaMetric(request);
    console.log(`Consumer Quota Metric: ${response.name}`);
    console.log(`Metric Display Name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Consumer quota metric not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when accessing consumer quota metric:', err.message);
    } else {
      console.error('Failed to retrieve consumer quota metric:', err);
    }
  }
}

module.exports = { getConsumerQuotaMetric };
// [END serviceusage_v1beta1_serviceusage_consumerquotametric_get]
