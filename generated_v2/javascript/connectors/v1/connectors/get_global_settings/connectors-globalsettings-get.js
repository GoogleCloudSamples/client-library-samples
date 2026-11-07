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

// [START connectors_v1_connectors_globalsettings_get]
'use strict';

const {ConnectorsClient} = require('@google-cloud/connectors');
const {status} = require('@grpc/grpc-js');

const client = new ConnectorsClient();

/**
 * Retrieves the global settings for a project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getGlobalSettings(projectId) {
  try {
    const name = `projects/${projectId}/locations/global/settings`;

    const request = {
      name,
    };

    const [settings] = await client.getGlobalSettings(request);
    console.log(`Retrieved global settings: ${settings.name}`);
    return settings;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Global settings resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing global settings: ${err.message}`);
    } else {
      console.error(`API call failed with status ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getGlobalSettings };
// [END connectors_v1_connectors_globalsettings_get]
