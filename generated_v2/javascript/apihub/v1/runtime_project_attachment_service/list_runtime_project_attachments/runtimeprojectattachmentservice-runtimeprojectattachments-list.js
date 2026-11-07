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

// [START apihub_v1_runtimeprojectattachmentservice_runtimeprojectattachments_list]
'use strict';

const {RuntimeProjectAttachmentServiceClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

const client = new RuntimeProjectAttachmentServiceClient();

/**
 * Use the listRuntimeProjectAttachments method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listRuntimeProjectAttachments(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const request = {
      parent,
    };

    const [attachments] = await client.listRuntimeProjectAttachments(request);
    for (const attachment of attachments) {
      console.log(`Runtime Project Attachment: ${attachment.name}`);
      console.log(`Runtime Project: ${attachment.runtimeProject}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication failed: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { listRuntimeProjectAttachments };
// [END apihub_v1_runtimeprojectattachmentservice_runtimeprojectattachments_list]
