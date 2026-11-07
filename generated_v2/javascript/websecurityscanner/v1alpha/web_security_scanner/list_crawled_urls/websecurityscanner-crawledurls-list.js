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

// [START websecurityscanner_v1alpha_websecurityscanner_crawledurls_list]
'use strict';

const {WebSecurityScannerClient} = require('@google-cloud/web-security-scanner');
const {status} = require('@grpc/grpc-js');

const client = new WebSecurityScannerClient();

/**
 * Use the listCrawledUrls method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} scanConfigId - ID of the ScanConfig (for example, 'example-scanconfig-id')
 * @param {string} scanRunId - ID of the ScanRun (for example, 'example-scanrun-id')
 */
async function listCrawledUrls(projectId, scanConfigId, scanRunId) {
  try {
    const parent = client.scanRunPath(projectId, scanConfigId, scanRunId);

    const [crawledUrls] = await client.listCrawledUrls({
      parent,
    });

    if (crawledUrls.length === 0) {
      console.log('No crawled URLs found for the specified scan run.');
      return;
    }

    console.log(`Found ${crawledUrls.length} crawled URL(s):`);
    for (const crawledUrl of crawledUrls) {
      console.log(`URL: ${crawledUrl.url}`);
      console.log(`HTTP Method: ${crawledUrl.httpMethod}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Specified resource was not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for resource:', err.message);
    } else if (err.code !== undefined) {
      console.error(`API Error (${err.code}):`, err.message);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = { listCrawledUrls };
// [END websecurityscanner_v1alpha_websecurityscanner_crawledurls_list]
