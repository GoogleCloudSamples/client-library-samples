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

// [START apihub_v1_runtimeprojectattachmentservice_runtimeprojectattachment_create]
'use strict';

const {RuntimeProjectAttachmentServiceClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

const client = new RuntimeProjectAttachmentServiceClient();

/**
 * Creates a runtime project attachment in API Hub.
 *
 * @param {string} projectId - The Google Cloud project ID of the host project (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where API Hub is provisioned (for example, 'us-central1').
 * @param {string} runtimeProjectAttachmentId - The ID of the runtime project to attach (for example, 'example-runtime-project-id').
 */
async function createRuntimeProjectAttachment(projectId, locationId, runtimeProjectAttachmentId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const runtimeProjectAttachment = {
      runtimeProject: `projects/${runtimeProjectAttachmentId}`,
    };

    const request = {
      parent,
      runtimeProjectAttachmentId,
      runtimeProjectAttachment,
    };

    const [response] = await client.createRuntimeProjectAttachment(request);
    console.log(`Created runtime project attachment: ${response.name}`);
    console.log(`Attached runtime project: ${response.runtimeProject}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Runtime project attachment already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error [${err.code}]: ${err.message}`);
    }
  }
}

module.exports = { createRuntimeProjectAttachment };
// [END apihub_v1_runtimeprojectattachmentservice_runtimeprojectattachment_create]
