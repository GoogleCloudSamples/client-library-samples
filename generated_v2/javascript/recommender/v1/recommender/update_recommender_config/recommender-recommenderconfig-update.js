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

// [START recommender_v1_recommender_recommenderconfig_update]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const recommenderClient = new RecommenderClient();

/**
 * Updates the configuration for a recommender.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Google Cloud location ID (for example, 'global' or a supported Google Cloud region or zone).
 * @param {string} recommenderId - Recommender identifier (for example, 'google.compute.instance.MachineTypeRecommender').
 */
async function updateRecommenderConfig(projectId, locationId, recommenderId) {
  try {
    // Recommender configurations for zonal recommenders require a zone scope (for example, 'us-central1-a').
    // If a region (for example, 'us-central1') is passed, append a default zone suffix.
    let location = locationId;
    if (location && location !== 'global' && !/-[a-z]$/.test(location)) {
      location = `${location}-a`;
    }

    const configName = `projects/${projectId}/locations/${location}/recommenders/${recommenderId}/config`;

    // Fetch the current configuration to obtain the etag for concurrency control
    const [currentConfig] = await recommenderClient.getRecommenderConfig({
      name: configName,
    });

    const recommenderConfig = {
      name: configName,
      displayName: 'Updated Recommender Config',
      etag: currentConfig.etag,
    };

    const updateMask = {
      paths: ['display_name'],
    };

    const [response] = await recommenderClient.updateRecommenderConfig({
      recommenderConfig,
      updateMask,
    });

    console.log(`Updated recommender config: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    console.log(`Etag: ${response.etag}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Recommender configuration not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error updating recommender config: ${err.message}`);
    }
  }
}

module.exports = { updateRecommenderConfig };
// [END recommender_v1_recommender_recommenderconfig_update]
