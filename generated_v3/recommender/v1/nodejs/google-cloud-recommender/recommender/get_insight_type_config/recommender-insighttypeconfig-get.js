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

// [START recommender_v1_recommender_insighttypeconfig_get]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Use the getInsightTypeConfig method
 *
 * @param {string} locationId - The Google Cloud location where the insight type resides (for example, 'global' or 'us-central1').
 * @param {string} insightTypeId - The predefined InsightType ID (for example, 'google.compute.firewall.Insight').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getInsightTypeConfig(locationId, insightTypeId, projectId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/insightTypes/${insightTypeId}/config`;

    const [insightTypeConfig] = await client.getInsightTypeConfig({name});

    console.log(`Retrieved configuration for: ${insightTypeConfig.name}`);
    console.log(`ETag: ${insightTypeConfig.etag}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Insight type configuration not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing insight type configuration: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { getInsightTypeConfig };
// [END recommender_v1_recommender_insighttypeconfig_get]
