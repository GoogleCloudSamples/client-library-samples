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

// [START artifactregistry_v1_artifactregistry_pythonpackages_list]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Lists Python packages in the specified Artifact Registry repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the repository.
 */
async function listPythonPackages(projectId, locationId, repositoryId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

    const request = {
      parent,
    };

    const [packages] = await client.listPythonPackages(request);

    if (!packages || packages.length === 0) {
      console.log('No Python packages found.');
      return;
    }

    for (const pkg of packages) {
      console.log(`Package Name: ${pkg.name}`);
      console.log(`Package URI: ${pkg.uri}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to list Python packages: ${err.message}`);
    }
  }
}

module.exports = { listPythonPackages };
// [END artifactregistry_v1_artifactregistry_pythonpackages_list]
