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

// [START parametermanager_v1_parametermanager_parameterversion_delete_async]
const {ParameterManagerClient} = require('@google-cloud/parametermanager').v1;
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Deletes a specific parameter version.
 *
 * @param {string} projectId Your Google Cloud Project ID. (for example, 'my-project-123')
 * @param {string} locationId The Google Cloud location where the parameter resides. (for example, 'global')
 * @param {string} parameterId The ID of the parameter. (for example, 'my-parameter')
 * @param {string} parameterVersionId The ID of the parameter version to delete. (for example, '1' or 'latest')
 */
async function deleteParameterVersion(
  projectId,
  locationId = 'global',
  parameterId = 'my-parameter',
  parameterVersionId = '1',
) {
  const name = client.parameterVersionPath(
    projectId,
    locationId,
    parameterId,
    parameterVersionId,
  );

  const request = {
    name,
  };

  try {
    await client.deleteParameterVersion(request);
    console.log(`Parameter version ${name} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Parameter version ${name} not found. Please make sure the project ID, location, parameter ID, and version ID are correct.`,
      );
    } else {
      console.error(`Error deleting parameter version ${name}: ${err.message}`);
    }
  }
}
// [END parametermanager_v1_parametermanager_parameterversion_delete_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const locationId = args[1];
  const parameterId = args[2];
  const parameterVersionId = args[3];
  await deleteParameterVersion(
    projectId,
    locationId,
    parameterId,
    parameterVersionId,
  );
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`
To run this sample from the command-line, specify four arguments:
	- Google Cloud Project ID like 'my-project'
	- Google Cloud Location like 'us-central1'
	- The ID of the parent parameter like 'my-parameter'
	- The ID of the version to delete like '1'

Usage:

	node parameter-manager-client-parameter-version-delete-async.js my-project us-central1 my-parameter 1
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteParameterVersion,
};
