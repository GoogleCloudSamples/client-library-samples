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

// [START dlp_v2_dlpservice_inspecttemplate_create_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;
const { status } = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Creates a Sensitive Data Protection inspection template for reusing frequently used configuration for inspecting content.
 *
 * An inspection template allows you to define a reusable configuration for scanning
 * sensitive data, including which info types to look for and how to handle findings.
 *
 * @param {string} projectId The Google Cloud Project ID.
 *   (e.g., 'my-project-id')
 * @param {string} location The location of the template.
 *   Templates can be 'global' or specific to a region (e.g., 'us-central1').
 *   (e.g., 'global')
 * @param {string} templateId The ID of the inspect template to create.
 *   This ID must be unique within the specified location and project/organization.
 *   (e.g., 'my-custom-template')
 */
async function createInspectTemplate(projectId, location, templateId) {
  const parent = `projects/${projectId}/locations/${location}`;

  // Define the inspect template configuration. This configuration specifies
  // which info types (sensitive data categories) the template should detect.
  const inspectTemplate = {
    displayName: `My Inspect Template (${templateId}))`,
    description: 'A sample inspect template for common info types.',
    inspectConfig: {
      infoTypes: [
        { name: 'PHONE_NUMBER' },
        { name: 'EMAIL_ADDRESS' },
        { name: 'CREDIT_CARD_NUMBER' },
      ],
      // Only return findings with 'POSSIBLE' or higher likelihood.
      // For more information on likelihood, see:
      // https://cloud.google.com/sensitive-data-protection/docs/likelihood
      minLikelihood: 'POSSIBLE',
      // Limits control the number of findings returned. Setting to 0 means unlimited.
      limits: {
        maxFindingsPerItem: 0,
        maxFindingsPerRequest: 0,
      },
    },
  };

  const request = {
    parent: parent,
    inspectTemplate: inspectTemplate,
    templateId: templateId,
  };

  try {
    const [response] = await dlp.createInspectTemplate(request);
    console.log(`Successfully created inspect template: ${response.name}`);
  } catch (err) {
    if (
      err.code === status.INVALID_ARGUMENT &&
      err.details.includes('already in use')
    ) {
      console.log(
        `Inspect template '${templateId}' already exists in location '${location}' of project '${projectId}'.`,
      );
      console.log(
        'Consider updating the existing template or using a different template ID.',
      );
    } else {
      console.error('Error creating inspect template:', err);
    }
  }
}
// [END dlp_v2_dlpservice_inspecttemplate_create_async]

function main(args) {
  if (args.length < 1) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  const templateId = args[2];
  createInspectTemplate(projectId, location, templateId);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three argument:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Resource name like 'my-inspect-template'
Usage:
 node dlp-service-client-inspect-template-create-async.js example-project-168 us-central1 my-inspect-template
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createInspectTemplate,
};
