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

// [START artifactregistry_v1_artifactregistry_pythonpackage_get]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Retrieves metadata for a Python package in Artifact Registry.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location or region of the repository.
 * @param {string} repositoryId - The repository ID containing the Python package.
 * @param {string} pythonPackageId - The package identifier (for example, 'example-package:1.0.0').
 */
async function getPythonPackage(projectId, locationId, repositoryId, pythonPackageId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/pythonPackages/${pythonPackageId}`;

    const [pythonPackage] = await client.getPythonPackage({name});

    console.log(`Package Name: ${pythonPackage.name}`);
    console.log(`Package URI: ${pythonPackage.uri}`);
    return pythonPackage;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Python package not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing Python package: ${err.message}`);
    } else {
      console.error(`Error retrieving Python package: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPythonPackage };
// [END artifactregistry_v1_artifactregistry_pythonpackage_get]
