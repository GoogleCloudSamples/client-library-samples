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

// [START artifactregistry_v1_artifactregistry_mavenartifact_get]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Retrieves details of a Maven artifact in an Artifact Registry repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or multi-region of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The Artifact Registry repository ID containing the Maven artifact.
 * @param {string} mavenArtifactId - The Maven artifact identifier formatted as 'groupId:artifactId:version' (for example, 'com.google.guava:guava:31.0-jre').
 */
async function getMavenArtifact(projectId, locationId, repositoryId, mavenArtifactId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/mavenArtifacts/${mavenArtifactId}`;

    const [artifact] = await client.getMavenArtifact({name});

    console.log(`Maven artifact resource name: ${artifact.name}`);
    console.log(`POM URI: ${artifact.pomUri}`);
    return artifact;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Maven artifact not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Access denied to Maven artifact: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error retrieving Maven artifact: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getMavenArtifact };
// [END artifactregistry_v1_artifactregistry_mavenartifact_get]
