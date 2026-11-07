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

// [START dialogflow_v3_securitysettingsservice_securitysettings_update]
'use strict';

const {SecuritySettingsServiceClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new SecuritySettingsServiceClient();

/**
 * Updates an existing Dialogflow CX security settings resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location of the security settings (for example, 'global' or 'us-central1').
 * @param {string} securitySettingsId - The server-generated ID of the Dialogflow CX security settings.
 */
async function updateSecuritySettings(projectId, locationId, securitySettingsId) {
  try {
    const updateMask = {
      paths: ['display_name'],
    };
    const securitySettings = {
      name: `projects/${projectId}/locations/${locationId}/securitySettings/${securitySettingsId}`,
      displayName: 'example-updated-security-settings',
    };

    // Regional endpoints require location-specific API endpoints.
    const regionalClient =
      locationId && locationId !== 'global'
        ? new SecuritySettingsServiceClient({
            apiEndpoint: `${locationId}-dialogflow.googleapis.com`,
          })
        : client;

    const [response] = await regionalClient.updateSecuritySettings({
      securitySettings,
      updateMask,
    });

    console.log(`Updated security settings: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Security settings resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update security settings: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateSecuritySettings };
// [END dialogflow_v3_securitysettingsservice_securitysettings_update]
