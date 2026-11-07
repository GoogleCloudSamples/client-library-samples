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

// [START artifactregistry_v1_artifactregistry_attachments_list]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Lists attachments in an Artifact Registry repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or multi-region of the repository (for example, 'us-central1' or 'us').
 * @param {string} repositoryId - The Artifact Registry repository ID.
 */
async function listAttachments(projectId, locationId, repositoryId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

    const request = {
      parent,
    };

    const [attachments] = await client.listAttachments(request);

    console.log(`Retrieved ${attachments.length} attachment(s) for repository: ${repositoryId}`);
    for (const attachment of attachments) {
      console.log(`Attachment: ${attachment.name}`);
      console.log(`Target: ${attachment.target}`);
      console.log(`Type: ${attachment.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found at: projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing repository: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list attachments: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listAttachments };
// [END artifactregistry_v1_artifactregistry_attachments_list]
