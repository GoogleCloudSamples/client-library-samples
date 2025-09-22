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

// [START dlp_v2_dlpservice_inspecttemplate_delete_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;
const { status } = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Deletes an existing Sensitive Data Protection inspection template.
 *
 * @param {string} projectId The Google Cloud project ID to use as a parent resource.
 * @param {string} location The Google Cloud location of the template (e.g., 'global', 'us-central1').
 * @param {string} templateId The ID of the inspect template to delete.
 */
async function deleteInspectTemplate(projectId, location, templateId) {
  const name = `projects/${projectId}/locations/${location}/inspectTemplates/${templateId}`;

  const request = {
    name: name,
  };

  try {
    await dlp.deleteInspectTemplate(request);
    console.log(`Successfully deleted inspect template ${templateId}.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Inspect template ${templateId} not found.`);
      console.log(
        'Ensure the template ID is correct and belongs to the specified project.',
      );
    } else {
      console.error('Error deleting inspect template:', err.message);
    }
  }
}
// [END dlp_v2_dlpservice_inspecttemplate_delete_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  deleteInspectTemplate(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Resource name like 'example-resource-id'
Usage:
 node dlp-service-client-inspect-template-delete-async.js example-project-168 us-central1 example-resource-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = { deleteInspectTemplate };
