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

const process = require('process');

// [START translate_v3beta1_translationservice_glossaries_list_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3beta1;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Lists all glossaries available in the specified project and location.
 *
 * A glossary is a custom dictionary to configure translation for domain-specific terminology.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'example-project-id')
 * @param {string} [location='us-central1'] Google Cloud Location (e.g., 'us-central1')
 */
async function listGlossaries(projectId, location = 'us-central1') {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
  };

  try {
    // Lists glossaries in the specified project and location.
    // The client library will automatically handle pagination.
    const [glossaries] = await client.listGlossaries(request);

    if (glossaries.length === 0) {
      console.log(
        `No glossaries found in location ${location} for project ${projectId}.`,
      );
      return;
    }

    console.log(`Glossaries found in ${location} for project ${projectId}:`);
    for (const glossary of glossaries) {
      console.log(`Glossary name: ${glossary.name}`);
      // Check if inputConfig and gcsSource exist before accessing inputUri
      if (glossary.inputConfig && glossary.inputConfig.gcsSource) {
        console.log(
          `\tInput URI: ${glossary.inputConfig.gcsSource.inputUri}`,
        );
      } else {
        console.log("\tInput URI: Not specified or not GCS source.");
      }
      console.log(`\tEntry Count: ${glossary.entryCount}`);
    }
  } catch (err) {
    // NOT_FOUND (404) indicates the project or location might not exist or is incorrect.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The project '${projectId}' or location '${location}' was not found. ` +
          "Please ensure the project ID and location are correct and the Translation API is enabled.",
      );
    } else {
      console.error('Error listing glossaries:', err.message);
      // Provide guidance for other errors if applicable, e.g., permissions.
      console.error(
        "Please check your network connection, project permissions, and API enablement.",
      );
    }
  }
}
// [END translate_v3beta1_translationservice_glossaries_list_async]

/**
 * Main function to parse arguments and call the listGlossaries function.
 * @param {string[]} args Command-line arguments.
 */
function main(args) {
  // Set a default project ID and location for easy testing.
  // Replace these with your actual project ID and desired location.
  const projectId = process.env.GOOGLE_CLOUD_PROJECT || 'cloud-samples-data';
  const location = 'us-central1';

  const userProjectId = args[0] || projectId;
  const userLocation = args[1] || location;

  listGlossaries(userProjectId, userLocation);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify arguments:\nUsage: node ${process.argv[1]} [projectId] [location]\n\nExample:\n  node ${process.argv[1]} my-project-id us-central1\n  node ${process.argv[1]} my-project-id global\n`,
    );
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = listGlossaries;
