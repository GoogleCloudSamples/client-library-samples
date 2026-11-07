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

// [START cloudquotas_v1beta_cloudquotas_quotapreferences_list]
'use strict';

const {CloudQuotasClient} = require('@google-cloud/cloudquotas');
const {status} = require('@grpc/grpc-js');

const client = new CloudQuotasClient();

/**
 * Lists quota preferences for a project.
 */
async function listQuotaPreferences() {
  try {
    const projectId = await client.getProjectId();
    const location = 'global';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [quotaPreferences] = await client.listQuotaPreferences(request);

    for (const preference of quotaPreferences) {
      console.log(`Quota Preference: ${preference.name}`);
      console.log(`Quota ID: ${preference.quotaId}`);
      console.log(`Preferred Value: ${preference.preferredValue}`);
      console.log(`Reconciling: ${preference.reconciling}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listQuotaPreferences };
// [END cloudquotas_v1beta_cloudquotas_quotapreferences_list]
