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

// [START artifactregistry_v1_artifactregistry_rule_update]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Updates an Artifact Registry repository rule.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the repository.
 * @param {string} repositoryId - The identifier of the Artifact Registry repository.
 * @param {string} ruleId - The identifier of the rule.
 */
async function updateRule(projectId, locationId, repositoryId, ruleId) {
  try {
    const rule = {
      name: `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/rules/${ruleId}`,
      action: 'ALLOW',
    };
    const updateMask = {
      paths: ['action'],
    };

    const request = {
      rule,
      updateMask,
    };

    const [updatedRule] = await client.updateRule(request);
    console.log(`Updated rule: ${updatedRule.name}`);
    console.log(`Action: ${updatedRule.action}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Rule not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update rule: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateRule };
// [END artifactregistry_v1_artifactregistry_rule_update]
