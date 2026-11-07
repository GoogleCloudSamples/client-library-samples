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

// [START cloudquotas_v1_quotaadjustersettingsmanager_quotaadjustersettings_get]
'use strict';

const {QuotaAdjusterSettingsManagerClient} = require('@google-cloud/cloudquotas');
const {status} = require('@grpc/grpc-js');

const client = new QuotaAdjusterSettingsManagerClient();

/**
 * Retrieves the Quota Adjuster settings for a project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID, which is 'global' for quota adjuster settings.
 */
async function getQuotaAdjusterSettings(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/quotaAdjusterSettings`;
    const [response] = await client.getQuotaAdjusterSettings({name});

    console.log(`Settings name: ${response.name}`);
    console.log(`Enablement state: ${response.enablement}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Settings not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error retrieving quota adjuster settings: ${err.message}`);
    }
  }
}

module.exports = { getQuotaAdjusterSettings };
// [END cloudquotas_v1_quotaadjustersettingsmanager_quotaadjustersettings_get]
