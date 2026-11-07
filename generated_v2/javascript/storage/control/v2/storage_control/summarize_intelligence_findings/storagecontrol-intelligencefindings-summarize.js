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

// [START storage_v2_storagecontrol_summarize_intelligence_findings]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Use the summarizeIntelligenceFindings method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region where intelligence findings are scoped (for example, 'global').
 */
async function summarizeIntelligenceFindings(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [response] = await client.summarizeIntelligenceFindings({
      parent,
    });

    console.log('Intelligence findings summary retrieved successfully.');
    console.log(JSON.stringify(response, null, 2));
    return response;
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing findings for ${projectId}: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to summarize intelligence findings: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { summarizeIntelligenceFindings };
// [END storage_v2_storagecontrol_summarize_intelligence_findings]
