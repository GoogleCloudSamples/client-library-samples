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

// [START recommender_v1beta1_recommender_recommenderconfig_update]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Updates a recommender configuration.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1-a' or 'global').
 * @param {string} recommenderId - The recommender ID (for example, 'google.compute.instance.MachineTypeRecommender').
 */
async function updateRecommenderConfig(projectId, locationId, recommenderId) {
  // Recommenders scoped to zones or regions cannot use 'global' as their location.
  if (
    locationId === 'global' &&
    (recommenderId.includes('compute') ||
      recommenderId.includes('instance') ||
      recommenderId.includes('MachineType'))
  ) {
    locationId = 'us-central1-a';
  }

  const name = `projects/${projectId}/locations/${locationId}/recommenders/${recommenderId}/config`;

  try {
    // Optimistic concurrency control requires the current resource etag.
    const [currentConfig] = await client.getRecommenderConfig({name});

    const recommenderConfig = {
      name,
      displayName: 'Example Recommender Configuration',
      etag: currentConfig.etag,
    };

    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      recommenderConfig,
      updateMask,
    };

    const [response] = await client.updateRecommenderConfig(request);

    console.log(`Updated recommender configuration: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Recommender configuration not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error updating recommender configuration: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {updateRecommenderConfig};
// [END recommender_v1beta1_recommender_recommenderconfig_update]
