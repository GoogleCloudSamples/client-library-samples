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

// [START apihub_v1_apihubcollect_collect_api_data]
'use strict';

const {ApiHubCollectClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

const client = new ApiHubCollectClient();

/**
 * Use the collectApiData method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud regional location where the API Hub instance is located (for example, 'us-central1').
 * @param {string} actionId - The action ID configured in the plugin instance to be used for collecting the API data.
 * @param {string} pluginId - The ID of the plugin (for example, 'example-plugin-id').
 * @param {string} instanceId - The ID of the plugin instance (for example, 'example-instance-id').
 */
async function collectApiData(projectId, locationId, actionId, pluginId, instanceId) {
  try {
    const collectionType = 'COLLECTION_TYPE_UPSERT';
    const location = `projects/${projectId}/locations/${locationId}`;
    const pluginInstance = `projects/${projectId}/locations/${locationId}/plugins/${pluginId}/instances/${instanceId}`;

    const apiResource = {
      displayName: 'example-api',
    };
    const updateTime = {
      seconds: Math.floor(Date.now() / 1000),
      nanos: 0,
    };
    const apiMetadata = {
      api: apiResource,
      originalUpdateTime: updateTime,
    };
    const apiData = {
      apiMetadataList: [apiMetadata],
    };

    const request = {
      location,
      pluginInstance,
      actionId,
      collectionType,
      apiData,
    };

    const [operation] = await client.collectApiData(request);
    const [response] = await operation.promise();

    console.log('Collected API data successfully.');
    console.log(`Operation response: ${JSON.stringify(response)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (Code ${err.code}): ${err.details || err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { collectApiData };
// [END apihub_v1_apihubcollect_collect_api_data]
