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

// [START contactcenterinsights_v1_contactcenterinsights_qaquestion_create]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Use the createQaQuestion method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (e.g., "us-central1").
 * @param {string} qaScorecardId - The ID of the parent QA scorecard.
 * @param {string} revisionId - The revision ID of the QA scorecard revision.
 * @param {string} qaQuestionId - Optional. A unique ID for the new QA question. If not specified, a server-generated ID will be used. Must be 4-64 characters matching ^[a-z0-9-]{4,64}$.
 */
async function createQaQuestion(projectId, locationId, qaScorecardId, revisionId, qaQuestionId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/qaScorecards/${qaScorecardId}/revisions/${revisionId}`;

    const qaQuestion = {
      abbreviation: 'greeting',
      questionBody: 'Did the agent greet the customer?',
      answerInstructions: 'Check if the agent welcomed the customer.',
      answerChoices: [
        {
          key: 'yes',
          boolValue: true,
        },
        {
          key: 'no',
          boolValue: false,
        },
      ],
    };

    const request = {
      parent,
      qaQuestion,
      qaQuestionId,
    };

    const [response] = await client.createQaQuestion(request);

    console.log(`Created QA question: ${response.name}`);
    console.log(`Question body: ${response.questionBody}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`QA question already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createQaQuestion };
// [END contactcenterinsights_v1_contactcenterinsights_qaquestion_create]
