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

// [START apihub_v1_apihubplugin_plugininstances_list]
'use strict';

const {ApiHubPluginClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

/**
 * Lists API Hub plugin instances in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location where the API Hub instance and plugins are located (for example, 'us-central1').
 * @param {string} pluginId - The ID of the plugin, or '-' to list instances across all plugins.
 */
async function listPluginInstances(projectId, locationId, pluginId) {
  const client = new ApiHubPluginClient();

  const parent = `projects/${projectId}/locations/${locationId}/plugins/${pluginId}`;
  const request = {
    parent,
  };

  try {
    const [pluginInstances] = await client.listPluginInstances(request);

    console.log(`Found ${pluginInstances.length} plugin instance(s):`);
    for (const instance of pluginInstances) {
      console.log(`Name: ${instance.name}`);
      console.log(`Display Name: ${instance.displayName}`);
      console.log(`State: ${instance.state}`);
    }
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(`Precondition not met: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.log(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.log(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listPluginInstances};
// [END apihub_v1_apihubplugin_plugininstances_list]
