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

// [START parametermanager_v1_parametermanager_parameter_delete_async]
const {ParameterManagerClient} = require('@google-cloud/parametermanager').v1;
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Deletes a parameter from Google Cloud Parameter Manager.
 *
 * This function demonstrates how to delete a parameter using its full resource name.
 * It includes error handling for cases where the parameter might not exist.
 *
 * @param {string} projectId Your Google Cloud project ID (for example, 'my-project-123')
 * @param {string} locationId The ID of the location where the parameter resides (for example, 'us-central1')
 * @param {string} parameterId The ID of the parameter to delete (for example, 'my-parameter')
 */
async function deleteParameter(
  projectId,
  locationId = 'global',
  parameterId = 'my-parameter',
) {
  const name = client.parameterPath(projectId, locationId, parameterId);

  const request = {
    name,
  };

  try {
    await client.deleteParameter(request);
    console.log(`Parameter ${name} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Parameter ${name} not found. It might have already been deleted or never existed.`,
      );
    } else {
      console.error(`Error deleting parameter ${name}:`, err);
    }
  }
}
// [END parametermanager_v1_parametermanager_parameter_delete_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const [projectId, locationId, parameterId] = args;
  await deleteParameter(projectId, locationId, parameterId);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify one to three arguments:
	- Google Cloud Project ID (e.g., 'my-project-123')
	- (Optional) Google Cloud location (e.g., 'global')
	- (Optional) The ID of the parameter to delete (e.g., 'my-parameter')

  Usage:

	node parameter-manager-client-parameter-delete-async.js <projectId> [locationId] [parameterId]
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {deleteParameter};
