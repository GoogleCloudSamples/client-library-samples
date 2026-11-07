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

// [START dlp_v2_dlpservice_inspecttemplate_create]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Use the createInspectTemplate method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The geographic location for processing and template storage (for example, 'global' or 'us-central1').
 * @param {string} inspectTemplateId - The caller-specified ID of the inspect template to create. Can contain letters, numbers, hyphens, and underscores (max 100 characters). If omitted or empty, the service generates an ID.
 */
async function createInspectTemplate(projectId, locationId, inspectTemplateId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const inspectConfig = {
      infoTypes: [
        {name: 'PHONE_NUMBER'},
        {name: 'EMAIL_ADDRESS'},
      ],
      minLikelihood: 'LIKELY',
    };

    const inspectTemplate = {
      displayName: 'Example Inspect Template',
      description: 'Template configured to inspect phone numbers and email addresses',
      inspectConfig,
    };

    const request = {
      parent,
      inspectTemplate,
      templateId: inspectTemplateId,
    };

    const [response] = await client.createInspectTemplate(request);
    console.log(`Created inspect template: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Inspect template already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create inspect template: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createInspectTemplate };
// [END dlp_v2_dlpservice_inspecttemplate_create]
