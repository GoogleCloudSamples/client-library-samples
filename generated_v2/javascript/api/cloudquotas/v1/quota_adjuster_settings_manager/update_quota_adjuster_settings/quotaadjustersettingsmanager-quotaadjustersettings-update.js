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

// [START cloudquotas_v1_quotaadjustersettingsmanager_quotaadjustersettings_update]
'use strict';

const {QuotaAdjusterSettingsManagerClient} = require('@google-cloud/cloudquotas');
const {status} = require('@grpc/grpc-js');

const client = new QuotaAdjusterSettingsManagerClient();

/**
 * Use the updateQuotaAdjusterSettings method
 *
 * @param {string} projectId - The Google Cloud project ID or project number.
 * @param {string} locationId - The location ID, which must be 'global' for QuotaAdjusterSettings.
 */
async function updateQuotaAdjusterSettings(projectId, locationId) {
  try {
    const quotaAdjusterSettings = {
      name: `projects/${projectId}/locations/${locationId}/quotaAdjusterSettings`,
      enablement: 'ENABLED',
    };
    const updateMask = {
      paths: ['enablement'],
    };

    const request = {
      quotaAdjusterSettings,
      updateMask,
    };

    const [response] = await client.updateQuotaAdjusterSettings(request);

    console.log(`Updated Quota Adjuster Settings: ${response.name}`);
    console.log(`Enablement status: ${response.enablement}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error updating quota adjuster settings: ${err.message}`);
    }
  }
}

module.exports = { updateQuotaAdjusterSettings };
// [END cloudquotas_v1_quotaadjustersettingsmanager_quotaadjustersettings_update]
