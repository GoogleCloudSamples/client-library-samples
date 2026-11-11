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

// [START cloudsupport_v2beta_caseattachmentservice_attachment_get]
'use strict';

const {CaseAttachmentServiceClient} = require('@google-cloud/support');
const {status} = require('@grpc/grpc-js');

const client = new CaseAttachmentServiceClient();

/**
 * Retrieves an attachment associated with a support case.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} caseId - The server-generated ID of the support case.
 * @param {string} attachmentId - The server-generated ID of the attachment.
 */
async function getAttachment(projectId, caseId, attachmentId) {
  try {
    const name = `projects/${projectId}/cases/${caseId}/attachments/${attachmentId}`;

    const request = {
      name,
    };

    const [response] = await client.getAttachment(request);
    console.log(`Attachment name: ${response.name}`);
    console.log(`Filename: ${response.filename}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Attachment not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getAttachment };
// [END cloudsupport_v2beta_caseattachmentservice_attachment_get]
