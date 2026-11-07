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

// [START recommender_v1_recommender_recommendation_get]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Retrieves a specific recommendation by its resource identifier.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global' or 'us-central1').
 * @param {string} recommenderId - The recommender ID (for example, 'google.compute.instance.MachineTypeRecommender').
 * @param {string} recommendationId - The server-generated ID of the recommendation.
 */
async function getRecommendation(projectId, locationId, recommenderId, recommendationId) {
  try {
    const name = client.projectLocationRecommenderRecommendationPath(
      projectId,
      locationId,
      recommenderId,
      recommendationId
    );

    const [recommendation] = await client.getRecommendation({name});

    console.log(`Recommendation name: ${recommendation.name}`);
    console.log(`Description: ${recommendation.description}`);
    console.log(`State: ${recommendation.stateInfo ? recommendation.stateInfo.state : 'STATE_UNSPECIFIED'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Recommendation not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getRecommendation };
// [END recommender_v1_recommender_recommendation_get]
