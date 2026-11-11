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

// [START cloudquotas_v1_cloudquotas_quotapreference_get]
'use strict';

const {CloudQuotasClient} = require('@google-cloud/cloudquotas');
const {status} = require('@grpc/grpc-js');

const client = new CloudQuotasClient();

/**
 * Use the getQuotaPreference method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The resource location. Cloud Quotas API requires this to be 'global'.
 * @param {string} quotaPreferenceId - The ID of the quota preference to retrieve. This is either caller-specified during creation or server-generated.
 */
async function getQuotaPreference(projectId, locationId, quotaPreferenceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/quotaPreferences/${quotaPreferenceId}`;
    const request = {
      name,
    };

    const [response] = await client.getQuotaPreference(request);

    console.log(`Quota preference name: ${response.name}`);
    console.log(`Quota ID: ${response.quotaId}`);
    console.log(`Service: ${response.service}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Quota preference not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getQuotaPreference };
// [END cloudquotas_v1_cloudquotas_quotapreference_get]
