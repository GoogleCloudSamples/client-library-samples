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

// [START artifactregistry_v1_artifactregistry_projectsettings_get]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Retrieves the Artifact Registry settings for the specified project.
 *
 * @param {string} projectId - The Google Cloud project ID for which to retrieve Artifact Registry project settings.
 */
async function getProjectSettings(projectId) {
  const name = `projects/${projectId}/projectSettings`;

  try {
    const [projectSettings] = await client.getProjectSettings({name});

    console.log(`Project settings name: ${projectSettings.name}`);
    console.log(`Legacy redirection state: ${projectSettings.legacyRedirectionState}`);
    return projectSettings;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project settings not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing project settings: ${err.message}`);
    } else {
      console.error(`Failed to retrieve project settings: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getProjectSettings };
// [END artifactregistry_v1_artifactregistry_projectsettings_get]
