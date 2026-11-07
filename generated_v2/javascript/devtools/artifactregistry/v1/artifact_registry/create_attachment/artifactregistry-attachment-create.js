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

// [START artifactregistry_v1_artifactregistry_attachment_create]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Creates an attachment in an Artifact Registry repository.
 *
 * @param {string} attachmentId - The caller-chosen ID to assign to the attachment. Must contain only lowercase letters, numbers, and hyphens.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Artifact Registry repository (for example, 'example-repository').
 * @param {string} fileId - The ID or hash of the file to attach (for example, 'sha256:abcdef...').
 */
async function createAttachment(attachmentId, projectId, locationId, repositoryId, fileId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

    let target;
    try {
      const [file] = await client.getFile({
        name: `${parent}/files/${fileId}`,
      });
      target = file.owner;
    } catch (getFileErr) {
      if (getFileErr.code !== status.NOT_FOUND) {
        throw getFileErr;
      }
    }

    if (!target) {
      const [packages] = await client.listPackages({parent});
      target = packages?.[0]?.name || `${parent}/packages/${fileId}`;
    }

    const attachment = {
      target,
      type: 'application/vnd.cyclonedx+json',
      files: [`${parent}/files/${fileId}`],
    };

    const [operation] = await client.createAttachment({
      parent,
      attachmentId,
      attachment,
    });

    const [response] = await operation.promise();
    console.log(`Created attachment: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Attachment already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to create attachment: ${err.message}`);
    }
  }
}

module.exports = {createAttachment};
// [END artifactregistry_v1_artifactregistry_attachment_create]
