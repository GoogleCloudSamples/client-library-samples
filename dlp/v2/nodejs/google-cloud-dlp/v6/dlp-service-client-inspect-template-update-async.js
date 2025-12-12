// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START dlp_v2_dlpservice_inspecttemplate_update_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;

const dlp = new DlpServiceClient();

/**
 * Updates an existing Sensitive Data Protection inspection template.
 *
 * This sample demonstrates how to update an existing Sensitive Data Protection inspection template
 * by changing its display name and description. The `updateMask` is crucial
 * for specifying which fields are to be updated.
 *
 * @param {string} projectId The Google Cloud Project ID. (e.g., 'my-project-id')
 * @param {string} location The location of the template. (e.g., 'global', 'us-central1')
 * @param {string} templateId The ID of the inspect template to update. (e.g., 'my-inspect-template-id')
 */
async function updateInspectTemplate(projectId, location, templateId) {
  const name = `projects/${projectId}/locations/${location}/inspectTemplates/${templateId}`;

  const inspectTemplate = {
    displayName: `Updated Inspect Template (${templateId})`,
    description:
      "This is an example of an updated inspect template description.",
  };

  // Specify which fields of the template are being updated.
  // The `updateMask` is a FieldMask that lists the fields to be updated.
  const updateMask = {
    paths: ['display_name', 'description'],
  };

  const request = {
    name,
    inspectTemplate,
    updateMask,
  };

  try {
    const [response] = await dlp.updateInspectTemplate(request);
    console.log(`Successfully updated inspect template: ${response.name}`);
    console.log(`New Display Name: ${response.displayName}`);
    console.log(`New Description: ${response.description}`);
  } catch (err) {
    if (err.code === 5) {
      console.error(
        `Error: Inspect template ${templateId} not found in project ${projectId}.`,
      );
      console.error(
        'Please ensure the template ID and project ID are correct and the template exists.',
      );
    } else {
      console.error('Error updating inspect template:', err.message);
    }
  }
}
// [END dlp_v2_dlpservice_inspecttemplate_update_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  updateInspectTemplate(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Resource name like 'example-resource-id'
Usage:
 node dlp-service-client-inspect-template-update-async.js example-project-168 global example-resource-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  updateInspectTemplate,
};
