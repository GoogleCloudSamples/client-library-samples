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

// [START artifactregistry_v1_artifactregistry_rules_list]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Lists rules in an Artifact Registry repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud regional or multi-regional location of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the repository whose rules will be listed.
 */
async function listRules(projectId, locationId, repositoryId) {
  const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

  try {
    const request = {
      parent,
    };

    // Retrieve the rules configured for the repository
    const [rules] = await client.listRules(request);

    console.log(`Retrieved ${rules.length} rule(s) for repository ${parent}:`);
    for (const rule of rules) {
      console.log(`Rule name: ${rule.name}`);
      console.log(`Action: ${rule.action}`);
      console.log(`Operation: ${rule.operation}`);
    }

    return rules;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found at: ${parent}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing rules for: ${parent}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for listing rules: ${err.message}`);
    } else {
      console.error(`Failed to list rules: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listRules };
// [END artifactregistry_v1_artifactregistry_rules_list]
