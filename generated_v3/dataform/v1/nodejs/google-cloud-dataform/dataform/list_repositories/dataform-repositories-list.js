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

// [START dataform_v1_dataform_repositories_list]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Lists Dataform repositories in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listRepositories(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [repositories] = await client.listRepositories({
      parent,
    });

    for (const repository of repositories) {
      console.log(`Repository: ${repository.name}`);
      if (repository.gitRemoteSettings && repository.gitRemoteSettings.url) {
        console.log(`  Git Remote URL: ${repository.gitRemoteSettings.url}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

module.exports = { listRepositories };
// [END dataform_v1_dataform_repositories_list]
