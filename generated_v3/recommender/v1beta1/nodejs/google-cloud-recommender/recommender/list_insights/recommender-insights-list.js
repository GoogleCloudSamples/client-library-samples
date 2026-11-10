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

// [START recommender_v1beta1_recommender_insights_list]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Use the listInsights method
 *
 * @param {string} locationId - The Google Cloud location (for example, 'global' or 'us-central1').
 * @param {string} insightTypeId - The insight type identifier (for example, 'google.compute.instance.IdleResourceInsight' or 'google.iam.policy.Insight').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listInsights(locationId, insightTypeId, projectId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/insightTypes/${insightTypeId}`;
    const request = {
      parent,
    };

    const [insights] = await client.listInsights(request);

    for (const insight of insights) {
      console.log(`Insight name: ${insight.name}`);
      console.log(`Description: ${insight.description}`);
      console.log(`State: ${insight.stateInfo ? insight.stateInfo.state : 'UNKNOWN'}`);
      console.log(`Severity: ${insight.severity}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Error listing insights: ${err.message}`);
    }
  }
}

module.exports = { listInsights };
// [END recommender_v1beta1_recommender_insights_list]
