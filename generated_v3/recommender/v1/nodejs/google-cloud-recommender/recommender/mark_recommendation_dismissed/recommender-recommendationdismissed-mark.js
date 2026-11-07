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

// [START recommender_v1_recommender_mark_recommendation_dismissed]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Dismisses a recommendation using the Recommender API.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global' or 'us-central1').
 * @param {string} recommenderId - The recommender identifier (for example, 'google.compute.instance.MachineTypeRecommender').
 * @param {string} recommendationId - The server-generated recommendation ID.
 * @param {string} etag - The fingerprint of the recommendation for optimistic locking.
 */
async function markRecommendationDismissed(projectId, locationId, recommenderId, recommendationId, etag) {
  try {
    const name = client.projectLocationRecommenderRecommendationPath(
      projectId,
      locationId,
      recommenderId,
      recommendationId
    );

    // Ensure the etag is enclosed in double quotes as required by the Recommender API
    const normalizedEtag = etag && !etag.startsWith('"') ? `"${etag}"` : etag;

    const request = {
      name,
      etag: normalizedEtag,
    };

    const [response] = await client.markRecommendationDismissed(request);

    console.log(`Recommendation name: ${response.name}`);
    console.log(`Recommendation state: ${response.stateInfo?.state}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Recommendation not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Recommendation is not in a dismissible state: ${err.message}`);
    } else {
      console.error(`Failed to dismiss recommendation: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { markRecommendationDismissed };
// [END recommender_v1_recommender_mark_recommendation_dismissed]
