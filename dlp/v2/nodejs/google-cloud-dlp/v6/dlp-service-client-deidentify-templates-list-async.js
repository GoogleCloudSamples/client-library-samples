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

// [START dlp_v2_dlpservice_deidentifytemplates_list_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;
const { status } = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Lists all Sensitive Data Protection de-identify templates in a given project and location.
 *
 * A de-identify template contains instructions on how to de-identify content.
 *
 * @param {string} projectId The Google Cloud Project ID (e.g., 'your-project-id').
 * @param {string} location The Google Cloud location (e.g., 'global', 'us-central1').
 *   Templates can be created at the project or organization level, and optionally within a specific location.
 *   Use 'global' for templates not bound to a specific region.
 */
async function listDeidentifyTemplates(projectId, location) {
  const parent = `projects/${projectId}/locations/${location}`;

  try {
    const [templates] = await dlp.listDeidentifyTemplates({ parent });

    if (templates.length === 0) {
      console.log(`No de-identify templates found in ${parent}.`);
      return;
    }

    for (const template of templates) {
      console.log(`Name: ${template.name}`);
      console.log(`\tDisplay Name: ${template.displayName || 'N/A'}`);
      console.log(`\tDescription: ${template.description || 'N/A'}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified parent resource "${parent}" was not found.`,
      );
      console.error(
        'Please ensure the project ID and location are correct and the DLP API is enabled.',
      );
    } else {
      console.error('Error listing de-identify templates:', err.message);
    }
  }
}
// [END dlp_v2_dlpservice_deidentifytemplates_list_async]

function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  listDeidentifyTemplates(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
Usage:
 node dlp-service-client-deidentify-templates-list-async.js example-project-168 us-central1
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listDeidentifyTemplates,
};
