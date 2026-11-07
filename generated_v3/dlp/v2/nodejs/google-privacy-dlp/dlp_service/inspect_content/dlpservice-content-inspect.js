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

// [START dlp_v2_dlpservice_inspect_content]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Inspects content for sensitive information using Cloud Data Loss Prevention.
 *
 * @param {string} projectId - The Google Cloud project ID under which the inspection request runs.
 */
async function inspectContent(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const inspectConfig = {
      infoTypes: [
        {name: 'PHONE_NUMBER'},
        {name: 'EMAIL_ADDRESS'},
      ],
      includeQuote: true,
      minLikelihood: 'POSSIBLE',
    };
    const item = {
      value: 'My email is test@example.com and phone is (555) 019-2834',
    };

    const request = {
      parent,
      inspectConfig,
      item,
    };

    const [response] = await client.inspectContent(request);
    const findings = response.result?.findings || [];

    console.log(`Total findings detected: ${findings.length}`);
    for (const finding of findings) {
      console.log(`Quote: ${finding.quote}`);
      console.log(`InfoType: ${finding.infoType?.name}`);
      console.log(`Likelihood: ${finding.likelihood}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument supplied to the inspection request:', err.details || err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Caller lacks required permissions to inspect content:', err.details || err.message);
    } else {
      console.error('Inspection request failed:', err.message || err);
    }
    throw err;
  }
}

module.exports = { inspectContent };
// [END dlp_v2_dlpservice_inspect_content]
