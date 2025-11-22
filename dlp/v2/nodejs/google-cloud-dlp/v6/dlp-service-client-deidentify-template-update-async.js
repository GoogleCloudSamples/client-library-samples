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

// [START dlp_v2_dlpservice_deidentifytemplate_update_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;
const { status } = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Updates an existing Sensitive Data Protection de-identify template.
 *
 * @param {string} [projectId='your-project-id'] The Google Cloud project ID to use as a parent resource.
 *     Example: 'your-project-id'
 * @param {string} [location='global'] The Google Cloud location (e.g., 'global', 'us-central1').
 *     Example: 'global'
 * @param {string} [templateId='my-deidentify-template'] The ID of the de-identify template to update.
 *     Example: 'my-deidentify-template'
 */
async function updateDeidentifyTemplate(
  projectId = 'your-project-id',
  location = 'global',
  templateId = 'my-deidentify-template',
) {
  // The full resource name of the template to update.
  // Example: projects/your-project-id/locations/global/deidentifyTemplates/my-deid-template-id
  const name = dlp.projectLocationDeidentifyTemplatePath(
    projectId,
    location,
    templateId,
  );

  // Construct the updated de-identify template object.
  // For this example, we're updating the display name and description.
  // You can update other fields within deidentifyConfig as needed.
  const deidentifyTemplate = {
    displayName: 'My Updated De-identify Template',
    description: 'This is an updated description for my de-identify template.',
  };

  // Create a FieldMask to specify which fields of the template are being updated.
  // This is crucial for partial updates. Only include fields that are actually changing.
  const updateMask = {
    paths: ['display_name', 'description'],
  };

  const request = {
    name,
    deidentifyTemplate,
    updateMask,
  };

  try {
    const [response] = await dlp.updateDeidentifyTemplate(request);
    console.log(`Successfully updated de-identify template: ${response.name}`);
    console.log(`Updated Display Name: ${response.displayName}`);
    console.log(`Updated Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `De-identify template ${templateId} not found in ${location} for project ${projectId}.`,
      );
      console.error(
        'Please ensure the template ID and project/location are correct.',
      );
    } else {
      console.error(
        `Error updating de-identify template ${templateId}: ${err.message}`,
      );
    }
  }
}
// [END dlp_v2_dlpservice_deidentifytemplate_update_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  updateDeidentifyTemplate(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Resource name like 'my-deidentify-template-id'
Usage:
 node dlp-service-client-deidentify-template-update-async.js example-project-168 us-central1 my-deidentify-template-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  updateDeidentifyTemplate,
};
