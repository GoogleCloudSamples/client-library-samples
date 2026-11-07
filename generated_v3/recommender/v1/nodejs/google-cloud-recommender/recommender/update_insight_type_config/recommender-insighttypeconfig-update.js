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

// [START recommender_v1_recommender_insighttypeconfig_update]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Updates an insight type configuration.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The GCP location (for example, 'global' or a regional location).
 * @param {string} insightTypeId - The insight type identifier (for example, 'google.compute.firewall.Insight').
 */
async function updateInsightTypeConfig(projectId, locationId, insightTypeId) {
  try {
    const configName = `projects/${projectId}/locations/${locationId}/insightTypes/${insightTypeId}/config`;

    // Retrieve the existing configuration to obtain the etag required for optimistic locking.
    const [currentConfig] = await client.getInsightTypeConfig({
      name: configName,
    });

    const insightTypeConfig = {
      name: configName,
      displayName: 'Updated Insight Type Config',
      etag: currentConfig.etag,
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      insightTypeConfig,
      updateMask,
    };

    const [response] = await client.updateInsightTypeConfig(request);
    console.log(`Updated insight type configuration: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Configuration resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied updating configuration: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided in configuration request: ${err.message}`);
    } else {
      console.error(`API error updating configuration: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateInsightTypeConfig };
// [END recommender_v1_recommender_insighttypeconfig_update]
