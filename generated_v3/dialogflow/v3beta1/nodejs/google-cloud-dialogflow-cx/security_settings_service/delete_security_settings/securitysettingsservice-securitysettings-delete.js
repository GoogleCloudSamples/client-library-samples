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

// [START dialogflow_v3beta1_securitysettingsservice_securitysettings_delete]
'use strict';

const {SecuritySettingsServiceClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes the specified security settings resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} securitySettingsId - The server-generated ID of the SecuritySettings resource (for example, '12345678-abcd-ef01-2345-6789abcdef01').
 */
async function deleteSecuritySettings(projectId, locationId, securitySettingsId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-dialogflow.googleapis.com`;
  }

  const client = new SecuritySettingsServiceClient(clientOptions);

  try {
    const name = `projects/${projectId}/locations/${locationId}/securitySettings/${securitySettingsId}`;

    const request = {
      name,
    };

    await client.deleteSecuritySettings(request);
    console.log(`Deleted security settings: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Security settings resource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Security settings resource is in use: ${err.message}`);
    } else {
      console.error(`Failed to delete security settings: ${err.message}`);
    }
  }
}

module.exports = { deleteSecuritySettings };
// [END dialogflow_v3beta1_securitysettingsservice_securitysettings_delete]
