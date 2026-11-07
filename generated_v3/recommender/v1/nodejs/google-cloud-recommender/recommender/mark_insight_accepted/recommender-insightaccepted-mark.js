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

// [START recommender_v1_recommender_mark_insight_accepted]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Marks an insight as accepted.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global' or a specific region) where the insight exists.
 * @param {string} insightTypeId - The insight type identifier (for example, 'google.compute.firewall.Insight').
 * @param {string} insightId - The server-generated ID of the insight to mark as accepted.
 * @param {string} etag - The fingerprint (etag) of the insight for optimistic locking.
 */
async function markInsightAccepted(projectId, locationId, insightTypeId, insightId, etag) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/insightTypes/${insightTypeId}/insights/${insightId}`;

    // Ensure the etag is enclosed in double quotes as required by the Recommender API.
    const formattedEtag = etag.startsWith('"') && etag.endsWith('"') ? etag : `"${etag}"`;

    const request = {
      name,
      etag: formattedEtag,
    };

    const [insight] = await client.markInsightAccepted(request);

    console.log(`Insight marked as accepted: ${insight.name}`);
    console.log(`Insight state: ${insight.stateInfo?.state}`);
    return insight;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Insight not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed (for example, state conflict or invalid etag): ${err.message}`);
    } else {
      console.error(`Error marking insight as accepted: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { markInsightAccepted };
// [END recommender_v1_recommender_mark_insight_accepted]
