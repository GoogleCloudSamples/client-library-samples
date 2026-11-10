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

// [START recommender_v1_recommender_mark_recommendation_claimed]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Marks a recommendation as claimed.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global' or 'us-central1').
 * @param {string} recommenderId - The recommender identifier (for example, 'google.compute.instance.MachineTypeRecommender').
 * @param {string} recommendationId - The server-generated recommendation ID.
 * @param {string} etag - Fingerprint of the Recommendation. Provides optimistic locking.
 */
async function markRecommendationClaimed(projectId, locationId, recommenderId, recommendationId, etag) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/recommenders/${recommenderId}/recommendations/${recommendationId}`;
    const stateMetadata = {'claimed-by': 'example-user'};

    // Ensure the etag is enclosed in double quotes as required by the API.
    const formattedEtag = etag ? `"${etag.replace(/^"|"$/g, '')}"` : etag;

    const request = {
      name,
      etag: formattedEtag,
      stateMetadata,
    };

    const [recommendation] = await client.markRecommendationClaimed(request);

    console.log(`Claimed recommendation: ${recommendation.name}`);
    console.log(`State: ${recommendation.stateInfo?.state}`);
    return recommendation;
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Recommendation not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { markRecommendationClaimed };
// [END recommender_v1_recommender_mark_recommendation_claimed]
