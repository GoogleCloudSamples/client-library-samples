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

// [START dlp_v2_dlpservice_deidentifytemplate_get_async]
const { DlpServiceClient } = require('@google-cloud/dlp').v2;
const { status } = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Gets a Sensitive Data Protection de-identify template.
 *
 * This sample demonstrates how to retrieve an existing de-identify template.
 *
 * @param {string} projectId The Google Cloud project ID to use as a parent resource.
 * @param {string} location The Google Cloud region to run the API call in (e.g., 'us-central1').
 * @param {string} deidentifyTemplateId The ID of the de-identify template to retrieve.
 */
async function getDeidentifyTemplate(
  projectId,
  location,
  deidentifyTemplateId,
) {
  const name = dlp.projectLocationDeidentifyTemplatePath(
    projectId,
    location,
    deidentifyTemplateId,
  );

  const request = {
    name: name,
  };

  try {
    const [deidentifyTemplate] = await dlp.getDeidentifyTemplate(request);

    console.log(
      `Successfully retrieved de-identify template: ${deidentifyTemplate.name}`,
    );
    console.log(`Display Name: ${deidentifyTemplate.displayName || 'N/A'}`);
    console.log(`Description: ${deidentifyTemplate.description || 'N/A'}`);
    const createTime = new Date(
      deidentifyTemplate.createTime.seconds * 1000 +
        deidentifyTemplate.createTime.nanos / 1000000,
    );
    console.log(`Create Time: ${createTime}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `De-identify template ${deidentifyTemplateId} not found in location ${location} for project ${projectId}.`,
      );
      console.error('Please ensure the template ID and location are correct.');
    } else {
      console.error('Error getting de-identify template:', err.message);
    }
    process.exitCode = 1;
  }
}
// [END dlp_v2_dlpservice_deidentifytemplate_get_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  getDeidentifyTemplate(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Resource name like 'my-deidentify-template-id'
Usage:
 node dlp-service-client-deidentify-template-get-async.js example-project-168 us-central1 my-deidentify-template-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getDeidentifyTemplate,
};
