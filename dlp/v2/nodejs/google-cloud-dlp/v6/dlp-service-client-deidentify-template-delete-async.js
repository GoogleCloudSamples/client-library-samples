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

// [START dlp_v2_dlpservice_deidentifytemplate_delete_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;
const { status } = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Deletes a Sensitive Data Protection de-identify template.
 * See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid
 * to learn more.
 *
 * @param {string} projectId The Google Cloud Project ID.
 *     (e.g., 'my-project')
 * @param {string} locationId The GCP location of the template.
 *     (e.g., 'global', 'us-central1')
 * @param {string} deidentifyTemplateId The ID of the de-identify template to delete.
 *     (e.g., 'my-deid-template')
 */
async function deleteDeidentifyTemplate(
  projectId,
  locationId,
  deidentifyTemplateId,
) {
  const name = dlp.projectLocationDeidentifyTemplatePath(
    projectId,
    locationId,
    deidentifyTemplateId,
  );

  const request = {
    name: name,
  };

  try {
    await dlp.deleteDeidentifyTemplate(request);
    console.log(
      `De-identify template ${deidentifyTemplateId} deleted successfully.`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`De-identify template ${deidentifyTemplateId} not found.`);
    } else {
      console.error(
        `Error deleting de-identify template ${deidentifyTemplateId}:`,
        err.message,
      );
    }
  }
}
// [END dlp_v2_dlpservice_deidentifytemplate_delete_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  deleteDeidentifyTemplate(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Resource name like 'my-deidentify-template-id'
Usage:
 node dlp-service-client-deidentify-template-delete-async.js example-project-168 us-central1 my-deidentify-template-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteDeidentifyTemplate,
};
