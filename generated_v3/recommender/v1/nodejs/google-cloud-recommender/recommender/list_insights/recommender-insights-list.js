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

// [START recommender_v1_recommender_insights_list]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Lists insights for the specified project, location, and insight type.
 *
 * @param {string} locationId - The Google Cloud location or region (for example, 'global' or 'us-central1').
 * @param {string} insightTypeId - The insight type identifier (for example, 'google.compute.firewall.Insight').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listInsights(locationId, insightTypeId, projectId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/insightTypes/${insightTypeId}`;

    const [insights] = await client.listInsights({parent});

    if (!insights || insights.length === 0) {
      console.log('No insights found.');
      return;
    }

    for (const insight of insights) {
      console.log(`Insight: ${insight.name}`);
      console.log(`Description: ${insight.description}`);
      console.log(`Severity: ${insight.severity}`);
      console.log(`Category: ${insight.category}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request arguments: ${err.message}`);
    } else {
      console.error(`Encountered error while listing insights: ${err.message}`);
    }
  }
}

module.exports = { listInsights };
// [END recommender_v1_recommender_insights_list]
