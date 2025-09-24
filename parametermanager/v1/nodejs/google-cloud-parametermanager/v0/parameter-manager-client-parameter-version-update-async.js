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

// [START parametermanager_v1_parametermanager_parameterversion_update_async]
const {ParameterManagerClient} = require('@google-cloud/parametermanager').v1;
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Updates an existing ParameterVersion with a new payload.
 *
 * This function demonstrates how to update a specific version of a parameter.
 * Note that updating a parameter version means replacing its entire payload.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'my-project-123')
 * @param {string} location The Google Cloud location of the parameter (for example, 'global')
 * @param {string} parameterId The ID of the parameter to update (for example, 'my-parameter')
 * @param {string} parameterVersionId The ID of the parameter version to update (for example, '1')
 */
async function updateParameterVersion(
  projectId,
  location = 'global',
  parameterId = 'my-parameter',
  parameterVersionId = '1',
) {
  const name = client.parameterVersionPath(
    projectId,
    location,
    parameterId,
    parameterVersionId,
  );

  const parameterVersion = {
    name,
    disabled: true,
  };

  const updateMask = {
    paths: ['disabled'],
  };

  const request = {
    parameterVersion,
    updateMask,
  };

  try {
    const [response] = await client.updateParameterVersion(request);
    console.log(`Successfully updated ParameterVersion: ${response.name}`);
    if (response.createTime) {
      const createTime = new Date(
        response.createTime.seconds * 1000 +
          response.createTime.nanos / 1000000,
      );
      console.log(`	Create Time: ${createTime}`);
    }
    console.log(`	Disabled: ${response.disabled}`);
    if (response.payload?.data) {
      console.log(
        `	Payload data (base64 encoded): ${response.payload.data.toString('base64')}`,
      );
      console.log(
        `	Payload data (UTF-8 decoded): ${response.payload.data.toString('utf8')}`,
      );
    } else {
      console.log('	No payload data found.');
    }
    if (response.updateTime) {
      const updateTime = new Date(
        response.updateTime.seconds * 1000 +
          response.updateTime.nanos / 1000000,
      );
      console.log(`	Update Time: ${updateTime}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: ParameterVersion ${name} not found. Please make sure the project, location, parameter ID, and version ID are correct.`,
      );
    } else {
      console.error('Error updating parameter version:', err.message);
    }
  }
}
// [END parametermanager_v1_parametermanager_parameterversion_update_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  const parameterId = args[2];
  const parameterVersionId = args[3];
  await updateParameterVersion(
    projectId,
    location,
    parameterId,
    parameterVersionId,
  );
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify four arguments:
	- Google Cloud Project like 'example-project-168'
	- Google Cloud Location like 'global'
	- Your parameter name like 'my-parameter'
	- Your parameter version like '1'

    Usage:

    node parameter-manager-client-parameter-version-update-async.js example-project-168 global my-parameter 1
    `);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {updateParameterVersion};
