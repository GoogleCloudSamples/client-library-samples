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

// [START recommender_v1_recommender_recommendations_list]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Lists recommendations for a specified Google Cloud project, location, and recommender.
 *
 * @param {string} locationId - The Google Cloud location (region or 'global') where the recommender is evaluated.
 * @param {string} recommenderId - The recommender identifier (for example, 'google.compute.instance.MachineTypeRecommender').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listRecommendations(locationId, recommenderId, projectId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/recommenders/${recommenderId}`;
    const request = {
      parent,
    };

    const [recommendations] = await client.listRecommendations(request);

    if (recommendations.length === 0) {
      console.log('No recommendations found.');
      return;
    }

    for (const recommendation of recommendations) {
      console.log(`Recommendation: ${recommendation.name}`);
      console.log(`Description: ${recommendation.description}`);
      console.log(`State: ${recommendation.stateInfo?.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API request failed: ${err.message}`);
    }
  }
}

module.exports = { listRecommendations };
// [END recommender_v1_recommender_recommendations_list]
