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

// [START cloudquotas_v1_cloudquotas_quotainfos_list]
'use strict';

const {CloudQuotasClient} = require('@google-cloud/cloudquotas');
const {status} = require('@grpc/grpc-js');

const client = new CloudQuotasClient();

/**
 * Lists quota information for a specific service in a project.
 */
async function listQuotaInfos() {
  try {
    const projectId =
      (arguments.length > 0 && arguments[0]) ||
      process.env.GOOGLE_CLOUD_PROJECT ||
      (await client.getProjectId());
    const location = 'global';
    const service = 'compute.googleapis.com';
    const parent = `projects/${projectId}/locations/${location}/services/${service}`;

    const request = {
      parent,
    };

    const [quotaInfos] = await client.listQuotaInfos(request);

    for (const quotaInfo of quotaInfos) {
      console.log(`Quota Name: ${quotaInfo.name}`);
      console.log(`Quota ID: ${quotaInfo.quotaId}`);
      console.log(`Metric: ${quotaInfo.metric}`);
      console.log(`Is Precise: ${quotaInfo.isPrecise}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(
        `API operation failed with code ${err.code}: ${err.message}`
      );
    }
  }
}

module.exports = {listQuotaInfos};
// [END cloudquotas_v1_cloudquotas_quotainfos_list]
