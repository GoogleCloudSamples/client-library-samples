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

// [START parametermanager_v1_parametermanager_parameterversion_create_async]
const {ParameterManagerClient} = require('@google-cloud/parametermanager').v1;
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Creates a new ParameterVersion for a given Parameter.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'my-project-id')
 * @param {string} locationId The Google Cloud location (for example, 'us-central1')
 * @param {string} parameterId The ID of the parent Parameter (for example, 'my-parameter')
 * @param {string} parameterVersionId The ID for the new ParameterVersion (for example, 'my-version-1')
 */
async function createParameterVersion(
  projectId,
  locationId = 'global',
  parameterId = 'my-parameter',
  parameterVersionId = 'v1',
) {
  const parent = client.parameterPath(projectId, locationId, parameterId);

  const payloadContent = '{"api_key": "your-api-key"}';
  const payloadBuffer = Buffer.from(payloadContent, 'utf8');

  const parameterVersion = {
    payload: {
      data: payloadBuffer,
    },
    // Set to true for a metadata-only version that is not renderable.
    disabled: false,
  };

  const request = {
    parent,
    parameterVersionId,
    parameterVersion,
  };

  try {
    const [response] = await client.createParameterVersion(request);
    console.log(`ParameterVersion ${response.name} created.`);
    if (response.createTime) {
      const createTime = new Date(
        response.createTime.seconds * 1000 +
          response.createTime.nanos / 1000000,
      );
      console.log(`	Create Time: ${createTime}`);
    }
    if (response.updateTime) {
      const updateTime = new Date(
        response.updateTime.seconds * 1000 +
          response.updateTime.nanos / 1000000,
      );
      console.log(`	Update Time: ${updateTime}`);
    }
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(
        `ParameterVersion '${parameterVersionId}' already exists for Parameter '${parameterId}' in location '${locationId}' of project '${projectId}'.`,
      );
    } else if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Parent Parameter '${parameterId}' not found in location '${locationId}' of project '${projectId}'.`,
      );
    } else {
      console.error('Error creating ParameterVersion:', err.message);
    }
  }
}
// [END parametermanager_v1_parametermanager_parameterversion_create_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const locationId = args[1];
  const parameterId = args[2];
  const parameterVersionId = args[3];
  await createParameterVersion(
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
	- The ID for the new version like 'v1'

Usage:

	node parameter-manager-client-parameter-version-create-async.js my-project us-central1 my-parameter v1
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createParameterVersion,
};
