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

// [START cloudquotas_v1_cloudquotas_quotapreferences_list]
'use strict';

const {CloudQuotasClient} = require('@google-cloud/cloudquotas');
const {status} = require('@grpc/grpc-js');

const client = new CloudQuotasClient();

/**
 * Use the listQuotaPreferences method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID. For Cloud Quotas quota preferences, this must be 'global'.
 */
async function listQuotaPreferences(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [quotaPreferences] = await client.listQuotaPreferences({
      parent,
    });

    for (const preference of quotaPreferences) {
      console.log(`Preference Name: ${preference.name}`);
      console.log(`Service: ${preference.service}`);
      console.log(`Quota ID: ${preference.quotaId}`);
      console.log(`Preferred Value: ${preference.quotaConfig?.preferredValue}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing ${projectId}:`, err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Specified resource was not found:`, err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided:`, err.message);
    } else {
      console.error(`API operation failed with gRPC status ${err.code}:`, err.message);
    }
  }
}

module.exports = { listQuotaPreferences };
// [END cloudquotas_v1_cloudquotas_quotapreferences_list]
