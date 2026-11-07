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

// [START websecurityscanner_v1alpha_websecurityscanner_scanconfigs_list]
'use strict';

const {WebSecurityScannerClient} = require('@google-cloud/web-security-scanner');
const {status} = require('@grpc/grpc-js');

const client = new WebSecurityScannerClient();

/**
 * Lists Web Security Scanner scan configurations in a project.
 *
 * @param {string} [projectId] - The Google Cloud project ID (for example, 'example-project-id').
 */
async function listScanConfigs(projectId) {
  try {
    if (typeof projectId === 'object' && projectId !== null) {
      projectId = projectId.projectId || projectId.project_id;
    }
    if (!projectId) {
      projectId =
        process.env.GOOGLE_CLOUD_PROJECT ||
        process.env.PROJECT_ID ||
        (await client.getProjectId());
    }

    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [scanConfigs] = await client.listScanConfigs(request);

    for (const scanConfig of scanConfigs) {
      console.log(`Scan config: ${scanConfig.name}`);
      console.log(`Display name: ${scanConfig.displayName}`);
    }

    if (scanConfigs.length === 0) {
      console.log('No scan configurations found.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Encountered error: ${err.message || err}`);
    }
  }
}

module.exports = {listScanConfigs};
// [END websecurityscanner_v1alpha_websecurityscanner_scanconfigs_list]
