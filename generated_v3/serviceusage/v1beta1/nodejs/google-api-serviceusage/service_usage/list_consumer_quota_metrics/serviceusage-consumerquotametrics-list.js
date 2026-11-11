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

// [START serviceusage_v1beta1_serviceusage_consumerquotametrics_list]
'use strict';

const {v1beta1} = require('@google-cloud/service-usage');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.ServiceUsageClient();

/**
 * Lists consumer quota metrics for a service in a Google Cloud project.
 */
async function listConsumerQuotaMetrics() {
  try {
    const projectId = await client.getProjectId();
    const service = 'compute.googleapis.com';
    const parent = `projects/${projectId}/services/${service}`;

    const request = {
      parent,
      view: 'FULL',
    };

    const [metrics] = await client.listConsumerQuotaMetrics(request);

    console.log(`Retrieved ${metrics.length} consumer quota metrics:`);
    for (const metric of metrics) {
      console.log(`- Name: ${metric.displayName} (${metric.metric})`);
      console.log(`  Unit: ${metric.unit}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else {
      console.error('API call failed:', err.message);
    }
  }
}

module.exports = {listConsumerQuotaMetrics};
// [END serviceusage_v1beta1_serviceusage_consumerquotametrics_list]
