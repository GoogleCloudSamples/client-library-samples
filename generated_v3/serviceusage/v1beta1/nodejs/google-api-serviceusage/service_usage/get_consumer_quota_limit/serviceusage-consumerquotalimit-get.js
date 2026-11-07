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

// [START serviceusage_v1beta1_serviceusage_consumerquotalimit_get]
'use strict';

const {v1beta1} = require('@google-cloud/service-usage');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.ServiceUsageClient();

/**
 * Retrieves the details of a consumer quota limit.
 */
async function getConsumerQuotaLimit() {
  try {
    const projectId = await client.getProjectId();
    const service = 'compute.googleapis.com';
    // Quota metric and limit identifiers are URL-encoded in the resource name.
    const metric = encodeURIComponent('compute.googleapis.com/cpus');
    const limit = encodeURIComponent('/project/region');

    const name = `projects/${projectId}/services/${service}/consumerQuotaMetrics/${metric}/limits/${limit}`;

    const request = {
      name,
    };

    const [quotaLimit] = await client.getConsumerQuotaLimit(request);

    console.log(`Quota limit name: ${quotaLimit.name}`);
    console.log(`Metric: ${quotaLimit.metric}`);
    console.log(`Unit: ${quotaLimit.unit}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Quota limit not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve consumer quota limit: ${err.message}`);
    }
  }
}

module.exports = {getConsumerQuotaLimit};
// [END serviceusage_v1beta1_serviceusage_consumerquotalimit_get]
