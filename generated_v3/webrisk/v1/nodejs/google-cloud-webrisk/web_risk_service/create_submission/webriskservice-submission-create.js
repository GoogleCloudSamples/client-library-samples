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

// [START webrisk_v1_webriskservice_submission_create]
'use strict';

const {WebRiskServiceClient} = require('@google-cloud/web-risk');
const {status} = require('@grpc/grpc-js');

const client = new WebRiskServiceClient();

/**
 * Use the createSubmission method
 *
 * @param {string} projectId - The Google Cloud project ID (or project number) making the submission.
 */
async function createSubmission(projectId) {
  try {
    const submission = {
      uri: 'http://testsafebrowsing.appspot.com/s/phishing.html',
    };
    const parent = `projects/${projectId}`;

    const request = {
      parent,
      submission,
    };

    const [response] = await client.createSubmission(request);
    console.log(`Created submission for URI: ${response.uri}`);
    if (response.threatTypes && response.threatTypes.length > 0) {
      console.log(`Detected threat types: ${response.threatTypes.join(', ')}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied. Project must be allowlisted: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Web Risk API error: ${err.message || err}`);
    }
  }
}

module.exports = { createSubmission };
// [END webrisk_v1_webriskservice_submission_create]
