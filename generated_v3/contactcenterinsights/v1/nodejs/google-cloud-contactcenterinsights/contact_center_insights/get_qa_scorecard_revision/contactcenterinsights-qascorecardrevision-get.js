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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecardrevision_get]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Use the getQaScorecardRevision method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region/location ID (e.g., 'us-central1').
 * @param {string} qaScorecardId - The ID of the parent QA scorecard.
 * @param {string} revisionId - The ID of the QA scorecard revision.
 */
async function getQaScorecardRevision(projectId, locationId, qaScorecardId, revisionId) {
  try {
    const name = client.qaScorecardRevisionPath(
      projectId,
      locationId,
      qaScorecardId,
      revisionId
    );

    const request = {
      name,
    };

    const [revision] = await client.getQaScorecardRevision(request);

    console.log(`QA Scorecard Revision: ${revision.name}`);
    return revision;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`QA scorecard revision not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request argument: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getQaScorecardRevision };
// [END contactcenterinsights_v1_contactcenterinsights_qascorecardrevision_get]
