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

// [START recommender_v1beta1_recommender_insight_get]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Retrieves an insight from the Recommender API.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global' or a supported region).
 * @param {string} insightTypeId - The insight type identifier (for example, 'google.iam.policy.Insight').
 * @param {string} insightId - The server-generated identifier of the insight.
 */
async function getInsight(projectId, locationId, insightTypeId, insightId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/insightTypes/${insightTypeId}/insights/${insightId}`;

    const [insight] = await client.getInsight({
      name,
    });

    console.log(`Insight retrieved: ${insight.name}`);
    console.log(`Description: ${insight.description}`);
    console.log(`Category: ${insight.category}`);
    console.log(`State: ${insight.stateInfo?.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Insight not found: ${err.message}`);
    } else {
      console.error(`Failed to retrieve insight: ${err.message}`);
    }
  }
}

module.exports = { getInsight };
// [END recommender_v1beta1_recommender_insight_get]
