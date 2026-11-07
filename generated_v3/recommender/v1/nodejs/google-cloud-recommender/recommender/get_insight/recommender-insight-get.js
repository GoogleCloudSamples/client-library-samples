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

// [START recommender_v1_recommender_insight_get]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Use the getInsight method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The GCP location (region or 'global') where the insight is located.
 * @param {string} insightTypeId - The insight type identifier (for example, 'google.compute.firewall.Insight').
 * @param {string} insightId - The server-generated ID of the insight.
 */
async function getInsight(projectId, locationId, insightTypeId, insightId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/insightTypes/${insightTypeId}/insights/${insightId}`;
    const [insight] = await client.getInsight({name});

    console.log(`Insight name: ${insight.name}`);
    console.log(`Description: ${insight.description}`);
    console.log(`State: ${insight.stateInfo ? insight.stateInfo.state : 'STATE_UNSPECIFIED'}`);
    console.log(`Severity: ${insight.severity}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Insight not found for ID: ${insightId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to retrieve the insight.');
    } else {
      console.error(`API error retrieving insight: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getInsight };
// [END recommender_v1_recommender_insight_get]
