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

// [START contactcenterinsights_v1_contactcenterinsights_allfeedbacklabels_list]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Lists all feedback labels in the specified location.
 */
async function listAllFeedbackLabels() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = client.locationPath(projectId, location);

    const request = {
      parent,
    };

    const [feedbackLabels] = await client.listAllFeedbackLabels(request);

    if (feedbackLabels.length === 0) {
      console.log('No feedback labels found.');
      return;
    }

    for (const feedbackLabel of feedbackLabels) {
      console.log(`Feedback label: ${feedbackLabel.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
  }
}

module.exports = { listAllFeedbackLabels };
// [END contactcenterinsights_v1_contactcenterinsights_allfeedbacklabels_list]
