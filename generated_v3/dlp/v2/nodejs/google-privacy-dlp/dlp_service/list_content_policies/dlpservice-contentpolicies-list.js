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

// [START dlp_v2_dlpservice_contentpolicies_list]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Lists Data Loss Prevention content policies in a project and location.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the content policies.
 * @param {string} locationId - The Google Cloud region or location (for example, 'global', 'us-central1').
 */
async function listContentPolicies(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [contentPolicies] = await client.listContentPolicies(request);

    if (!contentPolicies || contentPolicies.length === 0) {
      console.log('No content policies found.');
      return;
    }

    for (const policy of contentPolicies) {
      console.log(`Policy: ${policy.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listContentPolicies };
// [END dlp_v2_dlpservice_contentpolicies_list]
