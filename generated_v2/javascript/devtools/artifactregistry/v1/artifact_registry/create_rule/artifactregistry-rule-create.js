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

// [START artifactregistry_v1_artifactregistry_rule_create]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the createRule method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Artifact Registry repository location or region (for example, 'us-central1').
 * @param {string} repositoryId - The Artifact Registry repository ID.
 * @param {string} ruleId - The caller-chosen rule ID. Must begin with a lowercase letter and contain only lowercase letters and digits.
 */
async function createRule(projectId, locationId, repositoryId, ruleId) {
  try {
    const parent = client.repositoryPath(projectId, locationId, repositoryId);
    const rule = {
      action: 'ALLOW',
      operation: 'DOWNLOAD',
    };

    const [response] = await client.createRule({
      parent,
      ruleId,
      rule,
    });

    console.log(`Created rule: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Rule already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Rule creation failed with error code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { createRule };
// [END artifactregistry_v1_artifactregistry_rule_create]
