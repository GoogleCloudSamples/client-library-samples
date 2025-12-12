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

// [START parametermanager_v1_parametermanager_parameter_create_async]
const {ParameterManagerClient} = require('@google-cloud/parametermanager').v1;
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Creates a new Parameter in a given project and location.
 *
 * A Parameter acts as a container for ParameterVersions, which hold the actual values.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'my-project-123')
 * @param {string} location The Google Cloud location (for example, 'global')
 * @param {string} parameterId The unique ID for the parameter (for example, 'my-parameter-name')
 */
async function createParameter(
  projectId,
  location = 'global',
  parameterId = 'my-parameter',
) {
  const parent = `projects/${projectId}/locations/${location}`;
  const parameter = {
    // Treats the payload as raw bytes.
    format: 'UNFORMATTED',
  };

  const createParameterRequest = {
    parent,
    parameterId,
    parameter,
  };

  try {
    const [response] = await client.createParameter(createParameterRequest);
    console.log(`Created parameter: ${response.name}`);
    if (response.createTime) {
      const createTime = new Date(
        response.createTime.seconds * 1000 +
          response.createTime.nanos / 1000000,
      );
      console.log(`	Create Time: ${createTime}`);
    }
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.warn(
        `Parameter '${parameterId}' already exists in project '${projectId}' and location '${location}'.`,
      );
    } else {
      console.error('Error creating parameter or version:', err);
    }
  }
}
// [END parametermanager_v1_parametermanager_parameter_create_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const [projectId, location, parameterId] = args;
  await createParameter(projectId, location, parameterId);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify one to three arguments:
	- Google Cloud Project ID (e.g., 'my-project-123')
	- (Optional) Google Cloud location (e.g., 'global')
	- (Optional) The unique ID for the parameter (e.g., 'my-parameter-name')

  Usage:

	node parameter-manager-client-parameter-create-async.js <projectId> [location] [parameterId]
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {createParameter};
