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

// [START recommender_v1beta1_recommender_mark_recommendation_succeeded]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Marks a recommendation as succeeded.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} locationId The location of the recommendation (for example, 'global').
 * @param {string} recommenderId The recommender ID (for example, 'google.compute.instance.MachineTypeRecommender').
 * @param {string} recommendationId The server-generated recommendation ID.
 * @param {string} etag Fingerprint of the recommendation for optimistic locking.
 */
async function markRecommendationSucceeded(projectId, locationId, recommenderId, recommendationId, etag) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/recommenders/${recommenderId}/recommendations/${recommendationId}`;

    // Ensure the ETag is enclosed in double quotes required by the Recommender API
    const formattedEtag = etag.startsWith('"') && etag.endsWith('"') ? etag : `"${etag}"`;

    const request = {
      name,
      etag: formattedEtag,
    };

    const [response] = await client.markRecommendationSucceeded(request);

    console.log(`Marked recommendation as succeeded: ${response.name}`);
    console.log(`Recommendation state: ${response.stateInfo?.state}`);
    return response;
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.error(`ETag mismatch or invalid state transition: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Recommendation not found: ${err.message}`);
    } else {
      console.error(`Failed to mark recommendation as succeeded: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { markRecommendationSucceeded };
// [END recommender_v1beta1_recommender_mark_recommendation_succeeded]
