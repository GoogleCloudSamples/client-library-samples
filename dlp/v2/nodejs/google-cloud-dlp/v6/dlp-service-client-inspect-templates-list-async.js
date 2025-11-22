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

// [START dlp_v2_dlpservice_inspecttemplates_list_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;
const { status } = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Lists Sensitive Data Protection inspection templates in a specified project and location.
 *
 * inspection templates are reusable configurations for inspecting content.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'your-project-id')
 * @param {string} location The Google Cloud region to run the API call. (e.g., 'global')
 */
async function listInspectTemplates(projectId, location = 'global') {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
  };

  try {
    const [templates] = await client.listInspectTemplates(request);

    if (templates.length === 0) {
      console.log(`No inspect templates found for ${parent}.`);
      return;
    }

    for (const template of templates) {
      console.log(`Name: ${template.name}`);
      console.log(`\tDisplay Name: ${template.displayName || 'N/A'}`);
      console.log(`\tDescription: ${template.description || 'N/A'}`);
      const createTime = new Date(
        template.createTime.seconds * 1000 +
          template.createTime.nanos / 1000000,
      );
      console.log(`\tCreate Time: ${createTime}`);
    }
    console.log('Successfully listed inspect templates.');
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Parent resource ${parent} not found. Please check the project ID and location.`,
      );
    } else {
      console.error('Error listing inspect templates:', err.message);
    }
  }
}
// [END dlp_v2_dlpservice_inspecttemplates_list_async]

function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  listInspectTemplates(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
Usage:
 node dlp-service-client-inspect-templates-list-async.js example-project-168 us-central1
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listInspectTemplates,
};
