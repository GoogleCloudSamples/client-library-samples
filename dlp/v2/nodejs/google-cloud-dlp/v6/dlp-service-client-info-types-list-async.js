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

// [START dlp_v2_dlpservice_infotypes_list_async]
const { DlpServiceClient } = require('@google-cloud/dlp');
const { status } = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Lists all built-in InfoTypes (sensitive data types) supported by the Cloud DLP API.
 *
 * This sample demonstrates how to retrieve a list of predefined InfoTypes
 * that the Google Cloud DLP service can detect. InfoTypes represent categories
 * of sensitive data, such as email addresses, credit card numbers, or names.
 * The list can be filtered by the API method that supports the InfoType.
 *
 * @param {string} [location='global'] The Google Cloud region or 'global' to list InfoTypes from.
 *     (e.g., 'global', 'us-central1'). Defaults to 'global'.
 */
async function listInfoTypes(location = 'global') {
  const parent = `locations/${location}`;

  const request = {
    parent: parent,
    languageCode: 'en-US', // Optional: BCP-47 language code for localized names.
    filter: 'supported_by=INSPECT', // Optional: Filter to return only InfoTypes supported by inspect operations.
  };

  try {
    const [response] = await client.listInfoTypes(request);

    if (response.infoTypes.length === 0) {
      console.log(`No InfoTypes found for location: ${location}`);
      return;
    }

    console.log(`Successfully listed InfoTypes for location: ${location}`);
    console.log('InfoTypes:');
    for (const infoType of response.infoTypes) {
      console.log(`  Name: ${infoType.name}`);
      console.log(`  Display Name: ${infoType.displayName}`);
      console.log(`  Description: ${infoType.description}`);
      console.log(`  Supported By: ${infoType.supportedBy.join(', ')}`);
      if (infoType.example) {
        console.log(`  Example: ${infoType.example}`);
      }
      console.log('---');
    }
  } catch (err) {
    // Handle potential API errors.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified location '${location}' was not found or is invalid.`,
      );
      console.error(
        "Please ensure the location is correct (e.g., 'global', 'us-central1').",
      );
    } else {
      console.error('An unexpected error occurred:');
      console.error(err.message);
    }
  }
}
// [END dlp_v2_dlpservice_infotypes_list_async]

async function main(args) {
  if (args.length < 1) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const location = args[0];
  await listInfoTypes(location);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify one argument:
- Google Cloud Location like 'global'
Usage:
  node dlp-service-client-info-types-list-async.js global`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listInfoTypes,
};
