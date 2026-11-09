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

// [START artifactregistry_v1beta2_artifactregistry_repositories_list]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Lists Artifact Registry repositories in the specified location.
 */
async function listRepositories() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [repositories] = await client.listRepositories(request);

    if (repositories.length === 0) {
      console.log('No repositories found.');
      return;
    }

    for (const repository of repositories) {
      console.log(`Repository: ${repository.name}`);
      console.log(`Format: ${repository.format}`);
      console.log(`Description: ${repository.description}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location or project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listRepositories };
// [END artifactregistry_v1beta2_artifactregistry_repositories_list]
