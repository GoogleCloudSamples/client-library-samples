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

// [START dlp_v2_dlpservice_inspecttemplate_update]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Updates the description of an existing inspect template.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The geographic location (region or 'global') where the inspect template is stored.
 * @param {string} inspectTemplateId - The identifier of the inspect template to update.
 */
async function updateInspectTemplate(projectId, locationId, inspectTemplateId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/inspectTemplates/${inspectTemplateId}`;
    const inspectTemplate = {
      description: 'Updated inspect template description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      name,
      inspectTemplate,
      updateMask,
    };

    const [response] = await client.updateInspectTemplate(request);

    console.log(`Updated inspect template: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Inspect template not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error updating inspect template: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateInspectTemplate };
// [END dlp_v2_dlpservice_inspecttemplate_update]
