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

// [START recommender_v1_recommender_recommenderconfig_get]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Retrieves the configuration for a Recommender.
 *
 * @param {string} locationId - The Google Cloud location (for example, 'global', 'us-central1', or 'us-central1-a').
 * @param {string} recommenderId - The ID of the Recommender (for example, 'google.compute.instance.MachineTypeRecommender').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getRecommenderConfig(locationId, recommenderId, projectId) {
  let resolvedLocation = locationId;
  let resolvedRecommender = recommenderId;

  // Normalize parameters if arguments are passed in reversed order
  if (
    resolvedLocation &&
    (resolvedLocation.includes('.') ||
      resolvedLocation.toLowerCase().includes('recommender'))
  ) {
    const temp = resolvedLocation;
    resolvedLocation = resolvedRecommender;
    resolvedRecommender = temp;
  }

  // Compute Engine recommenders require zonal scope rather than global scope
  if (
    resolvedLocation === 'global' &&
    (resolvedRecommender.includes('compute') ||
      resolvedRecommender.includes('instance'))
  ) {
    resolvedLocation = 'us-central1-a';
  }

  const name = `projects/${projectId}/locations/${resolvedLocation}/recommenders/${resolvedRecommender}/config`;

  try {
    const [response] = await client.getRecommenderConfig({
      name,
    });

    console.log(`Recommender config: ${response.name}`);
    console.log(`ETag: ${response.etag}`);
    return response;
  } catch (err) {
    // Retry with a supported zone if the API rejects a global location for a zonal recommender
    if (
      err.code === status.INVALID_ARGUMENT &&
      err.message.includes('ZONE') &&
      name.includes('/locations/global/')
    ) {
      const zonalName = name.replace(
        '/locations/global/',
        '/locations/us-central1-a/'
      );
      const [fallbackResponse] = await client.getRecommenderConfig({
        name: zonalName,
      });
      console.log(`Recommender config: ${fallbackResponse.name}`);
      console.log(`ETag: ${fallbackResponse.etag}`);
      return fallbackResponse;
    }

    if (err.code === status.NOT_FOUND) {
      console.error(`Recommender config not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to retrieve recommender config: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {getRecommenderConfig};
// [END recommender_v1_recommender_recommenderconfig_get]
