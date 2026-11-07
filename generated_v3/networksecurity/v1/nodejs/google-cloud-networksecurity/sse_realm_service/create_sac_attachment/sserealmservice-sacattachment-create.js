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

// [START networksecurity_v1_sserealmservice_sacattachment_create]
'use strict';

const networkSecurity = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

// Support standard GAPIC client naming conventions.
const SseRealmServiceClient =
  networkSecurity.SseRealmServiceClient ||
  networkSecurity.SseRealmClient ||
  networkSecurity.SSERealmServiceClient ||
  networkSecurity.SSERealmClient ||
  (networkSecurity.v1 &&
    (networkSecurity.v1.SseRealmServiceClient ||
      networkSecurity.v1.SseRealmClient ||
      networkSecurity.v1.SSERealmServiceClient ||
      networkSecurity.v1.SSERealmClient));

const client = new SseRealmServiceClient();

/**
 * Creates a SAC attachment in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} sacAttachmentId - ID of the SAC attachment (for example, 'example-sac-attachment-id')
 */
async function createSacAttachment(projectId, locationId, sacAttachmentId) {
  try {
    // Construct the parent resource path from the project and location identifiers.
    const parent = `projects/${projectId}/locations/${locationId}`;
    const sacAttachment = {
      description: 'Example SAC attachment',
    };

    const request = {
      parent,
      sacAttachmentId,
      sacAttachment,
    };

    // Initiate the long-running operation to create the SAC attachment.
    const [operation] =
      typeof client.createSacAttachment === 'function'
        ? await client.createSacAttachment(request)
        : await client.createSACAttachment(request);
    const [response] = await operation.promise();

    console.log(`Created SAC attachment: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`SAC attachment already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

module.exports = { createSacAttachment };
// [END networksecurity_v1_sserealmservice_sacattachment_create]
