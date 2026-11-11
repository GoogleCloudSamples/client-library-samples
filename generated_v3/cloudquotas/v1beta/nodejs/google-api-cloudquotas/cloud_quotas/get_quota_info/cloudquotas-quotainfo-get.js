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

// [START cloudquotas_v1beta_cloudquotas_quotainfo_get]
'use strict';

const {CloudQuotasClient} = require('@google-cloud/cloudquotas');
const {status} = require('@grpc/grpc-js');

const client = new CloudQuotasClient();

/**
 * Use the getQuotaInfo method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location for the quota info. Cloud Quotas enforces that this must be 'global'.
 * @param {string} serviceId - The service name in which the quota is defined, e.g. 'compute.googleapis.com'.
 * @param {string} quotaInfoId - The ID of the quota within the service, e.g. 'CpusPerProjectPerRegion'.
 */
async function getQuotaInfo(projectId, locationId, serviceId, quotaInfoId) {
  const name = `projects/${projectId}/locations/${locationId}/services/${serviceId}/quotaInfos/${quotaInfoId}`;

  try {
    const request = {
      name,
    };

    const [quotaInfo] = await client.getQuotaInfo(request);

    console.log(`Quota Info Name: ${quotaInfo.name}`);
    console.log(`Quota ID: ${quotaInfo.quotaId}`);
    console.log(`Metric: ${quotaInfo.metric}`);
    console.log(`Quota Display Name: ${quotaInfo.quotaDisplayName}`);
    return quotaInfo;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Quota info resource was not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing: ${name}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for quota lookup: ${err.message}`);
    } else {
      console.error(`API error retrieving quota info: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getQuotaInfo };
// [END cloudquotas_v1beta_cloudquotas_quotainfo_get]
