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

// [START dlp_v2_dlpservice_deidentifytemplate_create_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;
const { status } = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Creates a Sensitive Data Protection de-identify template for reusing frequently used configuration
 * for de-identifying content, images, and storage.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} locationId The GCP location of the template (e.g., 'global', 'us-central1').
 * @param {string} templateId The ID of the template to create.
 */
async function createDeidentifyTemplate(projectId, locationId, templateId) {
  const parent = `projects/${projectId}/locations/${locationId}`;

  // Configure the de-identification transformation.
  // This example replaces all found email addresses with the string '[REDACTED]'.
  const deidentifyConfig = {
    infoTypeTransformations: {
      transformations: [
        {
          infoTypes: [{ name: 'EMAIL_ADDRESS' }],
          primitiveTransformation: {
            replaceConfig: {
              newValue: {
                stringValue: '[REDACTED]',
              },
            },
          },
        },
      ],
    },
  };

  // Construct the request to create the de-identify template.
  const request = {
    parent: parent,
    deidentifyTemplate: {
      displayName: `My Deidentify Template for Emails (${templateId})`,
      description: 'A sample deidentify template to redact email addresses.',
      deidentifyConfig: deidentifyConfig,
    },
    templateId: templateId,
  };

  try {
    // Send the request to create the de-identify template.
    const [response] = await client.createDeidentifyTemplate(request);
    console.log(`Successfully created deidentify template: ${response.name}`);
  } catch (err) {
    if (
      err.code === status.INVALID_ARGUMENT &&
      err.details.includes('already in use')
    ) {
      console.log(
        `Deidentify template '${templateId}' already exists in ${parent}.`,
      );
    } else {
      console.error(
        `Error creating deidentify template '${templateId}' in ${parent}:`,
        err,
      );
    }
  }
}
// [END dlp_v2_dlpservice_deidentifytemplate_create_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  createDeidentifyTemplate(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID like 'example-project-123'
 - Google Cloud Location like 'global' or 'us-central1'
 - Resource name like 'my-deid-template-id'
Usage:
 node dlp-service-client-deidentify-template-create-async.js example-project-123 global my-deid-template-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createDeidentifyTemplate,
};
