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

// [START dlp_v2_dlpservice_inspecttemplates_list]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Use the listInspectTemplates method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region or processing location for Sensitive Data Protection (for example, 'global' or 'us-central1').
 */
async function listInspectTemplates(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [templates] = await client.listInspectTemplates(request);

    if (templates.length === 0) {
      console.log('No inspect templates found.');
      return;
    }

    for (const template of templates) {
      console.log(`Template name: ${template.name}`);
      console.log(`Display name: ${template.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument:', err.message);
    } else {
      console.error('API error:', err.message);
    }
  }
}

module.exports = { listInspectTemplates };
// [END dlp_v2_dlpservice_inspecttemplates_list]
