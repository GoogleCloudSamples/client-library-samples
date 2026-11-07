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

// [START serviceusage_v1beta1_serviceusage_adminoverrides_list]
'use strict';

const {v1beta1} = require('@google-cloud/service-usage');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.ServiceUsageClient();

/**
 * Lists administrator overrides for a consumer quota limit.
 */
async function listAdminOverrides() {
  try {
    const projectId = await client.getProjectId();
    const serviceName = 'compute.googleapis.com';
    const metricName = 'compute.googleapis.com%2Fcpus';
    const limitName = '%2Fproject%2Fregion';

    const parent = `projects/${projectId}/services/${serviceName}/consumerQuotaMetrics/${metricName}/limits/${limitName}`;

    const request = {
      parent,
    };

    const [overrides] = await client.listAdminOverrides(request);

    console.log(`Retrieved ${overrides.length} administrator override(s).`);
    for (const override of overrides) {
      console.log(`Name: ${override.name}`);
      console.log(`Override value: ${override.overrideValue}`);
      if (override.dimensions) {
        console.log(`Dimensions: ${JSON.stringify(override.dimensions)}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Quota limit resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to list administrator overrides:', err.message);
    } else if (err.code) {
      console.error(`API error (${err.code}):`, err.message);
    } else {
      console.error('Unexpected error listing administrator overrides:', err);
    }
  }
}

module.exports = { listAdminOverrides };
// [END serviceusage_v1beta1_serviceusage_adminoverrides_list]
