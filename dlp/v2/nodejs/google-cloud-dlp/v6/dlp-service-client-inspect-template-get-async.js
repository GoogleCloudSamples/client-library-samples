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

// [START dlp_v2_dlpservice_inspecttemplate_get_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;
const { status } = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Gets a Sensitive Data Protection inspection template.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} locationId The Google Cloud location of the template (e.g., 'global', 'us-central1').
 * @param {string} inspectTemplateId The ID of the inspect template to retrieve.
 */
async function getInspectTemplate(projectId, locationId, inspectTemplateId) {
  // The resource name of the inspect template to retrieve.
  // Format: `projects/{project_id}/locations/{location_id}/inspectTemplates/{inspect_template_id}`
  const name = dlp.projectLocationInspectTemplatePath(
    projectId,
    locationId,
    inspectTemplateId,
  );

  const request = {
    name: name,
  };

  try {
    const [inspectTemplate] = await dlp.getInspectTemplate(request);
    console.log(
      `Successfully retrieved inspect template: ${inspectTemplate.name}`,
    );
    console.log(`Display Name: ${inspectTemplate.displayName || 'N/A'}`);
    console.log(`Description: ${inspectTemplate.description || 'N/A'}`);
    const createTime = new Date(
      inspectTemplate.createTime.seconds * 1000 +
        inspectTemplate.createTime.nanos / 1000000,
    );
    console.log(`\tCreate Time: ${createTime}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Inspect template ${inspectTemplateId} not found in location ${locationId} of project ${projectId}.`,
      );
      console.error(
        'Please ensure the template ID and location are correct and the template exists.',
      );
    } else {
      console.error('Error getting inspect template:', err);
    }
  }
}
// [END dlp_v2_dlpservice_inspecttemplate_get_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  getInspectTemplate(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Resource name like 'example-resource-id'
Usage:
 node dlp-service-client-inspect-template-get-async.js example-project-168 us-central1 example-resource-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getInspectTemplate,
};
