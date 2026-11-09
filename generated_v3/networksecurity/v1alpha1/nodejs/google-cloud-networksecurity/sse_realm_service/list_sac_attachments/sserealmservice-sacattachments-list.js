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

// [START networksecurity_v1alpha1_sserealmservice_sacattachments_list]
'use strict';

const {v1alpha1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const SSERealmServiceClient =
  v1alpha1.SSERealmServiceClient || v1alpha1.SseRealmServiceClient;
const client = new SSERealmServiceClient();

/**
 * Lists SAC attachments in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listSacAttachments(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [response] = typeof client.listSACAttachments === 'function'
      ? await client.listSACAttachments({parent})
      : await client.listSacAttachments({parent});

    const attachments = Array.isArray(response)
      ? response
      : (response?.sacAttachments || response?.sac_attachments || []);

    console.log(`Retrieved ${attachments.length} SAC attachment(s).`);
    for (const attachment of attachments) {
      console.log(`Attachment: ${attachment.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listSacAttachments };
// [END networksecurity_v1alpha1_sserealmservice_sacattachments_list]
