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

// [START contactcenterinsights_v1_contactcenterinsights_deploy_qa_scorecard_revision]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Deploys a QA scorecard revision.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID (for example, 'us-central1').
 * @param {string} qaScorecardId - The identifier of the parent QA scorecard.
 * @param {string} revisionId - The revision ID of the QA scorecard revision to deploy.
 */
async function deployQaScorecardRevision(projectId, locationId, qaScorecardId, revisionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/qaScorecards/${qaScorecardId}/revisions/${revisionId}`;

    // Ensure the revision has completed tuning and entered the READY state before deployment.
    try {
      const [revision] = await client.getQaScorecardRevision({name});
      if (revision.state === 'EDITABLE' || revision.state === 1) {
        const [operation] = await client.tuneQaScorecardRevision({parent: name});
        await operation.promise();
      }
    } catch {
      // Proceed to deployment retry loop if pre-check or tuning operation is handled elsewhere.
    }

    const request = {
      name,
    };

    // Poll deployment until asynchronous tuning transitions the revision to the READY state.
    let response;
    const maxAttempts = 30;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        [response] = await client.deployQaScorecardRevision(request);
        break;
      } catch (err) {
        if (err.code === status.FAILED_PRECONDITION && attempt < maxAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }
        throw err;
      }
    }

    console.log(`Deployed QA scorecard revision: ${response.name}`);
    console.log(`State: ${response.state}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`QA scorecard revision not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Failed precondition for revision deployment: ${err.message}`);
    } else {
      console.error(`Deployment request failed with gRPC status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { deployQaScorecardRevision };
// [END contactcenterinsights_v1_contactcenterinsights_deploy_qa_scorecard_revision]
