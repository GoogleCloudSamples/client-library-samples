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

// [START artifactregistry_v1beta2_artifactregistry_projectsettings_update]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Updates the project settings for Artifact Registry.
 */
async function updateProjectSettings() {
  try {
    const projectId = await client.getProjectId();
    const name = client.projectSettingsPath(projectId);

    const request = {
      projectSettings: {
        name,
        legacyRedirectionState: 'REDIRECTION_FROM_GCR_KEEP_TAGS',
      },
      updateMask: {
        paths: ['legacy_redirection_state'],
      },
    };

    const [response] = await client.updateProjectSettings(request);

    console.log(`Updated project settings: ${response.name}`);
    console.log(`Legacy redirection state: ${response.legacyRedirectionState}`);
  } catch (err) {
    if (
      err.code === status.INVALID_ARGUMENT &&
      err.message &&
      err.message.includes('all gcr.io urls use Artifact Registry')
    ) {
      // Redirection settings are permanently applied when Container Registry deprecation
      // is finalized and can no longer be modified.
      console.log(
        'Legacy redirection state is permanently applied: all gcr.io URLs use Artifact Registry.'
      );
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update project settings: ${err.message}`);
    }
  }
}

module.exports = { updateProjectSettings };
// [END artifactregistry_v1beta2_artifactregistry_projectsettings_update]
