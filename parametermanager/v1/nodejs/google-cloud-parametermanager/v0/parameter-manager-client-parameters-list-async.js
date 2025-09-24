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
// [START parametermanager_v1_parametermanager_parameters_list_async]
const {ParameterManagerClient} = require('@google-cloud/parametermanager').v1;
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Lists all parameters available in the specified project and location.
 *
 * A parameter is a named value that can store configuration data. This sample
 * demonstrates how to list all parameters within a given project and location.
 *
 * @param {string} projectId The Google Cloud Project ID (for example, 'your-project-id').
 * @param {string} location The Google Cloud location (for example, 'us-central1').
 */
async function listParameters(projectId, location = 'us-central1') {
  try {
    const parent = client.locationPath(projectId, location);

    const request = {
      parent,
    };

    console.log(
      `Listing parameters in project ${projectId}, location ${location}...`,
    );

    for await (const parameter of client.listParametersAsync(request)) {
      console.log(`Found parameter: ${parameter.name}`);
      if (parameter.createTime) {
        const createTime = new Date(
          parameter.createTime.seconds * 1000 +
            parameter.createTime.nanos / 1000000,
        );
        console.log(`	Create Time: ${createTime}`);
      }
      console.log(`	Format: ${parameter.format}`);
      if (parameter.kmsKey) {
        console.log(`	KMS Key: ${parameter.kmsKey}`);
      }
    }
    console.log('Parameter listing complete.');
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The project '${projectId}' or location '${location}' was not found.`,
      );
      console.error(
        'Make sure that the project ID and location are correct and that the Parameter Manager API is enabled.',
      );
    } else {
      console.error('Error listing parameters:', err.message);
    }
  }
}
// [END parametermanager_v1_parametermanager_parameters_list_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  await listParameters(projectId, location);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
	- Google Cloud Project ID (for example, 'my-project-id')
	- Google Cloud Location (for example, 'us-central1')

Usage:
  node parameter-manager-client-parameters-list-async.js <projectId> <location>
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listParameters,
};
