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

// [START parametermanager_v1_parametermanager_parameterversion_get_async]
const {ParameterManagerClient} = require('@google-cloud/parametermanager').v1;
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Gets details of a single ParameterVersion.
 *
 * This sample demonstrates how to retrieve a specific version of a parameter.
 * Parameter versions store the actual payload data of a parameter at a given point in time.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'my-project-123')
 * @param {string} location The Google Cloud location (for example, 'us-central1')
 * @param {string} parameterId The ID of the parameter (for example, 'my-parameter')
 * @param {string} parameterVersionId The ID of the parameter version (for example, '1' or 'latest')
 */
async function getParameterVersion(
  projectId,
  location = 'us-central1',
  parameterId = 'my-parameter',
  parameterVersionId = '1',
) {
  const name = client.parameterVersionPath(
    projectId,
    location,
    parameterId,
    parameterVersionId,
  );

  const request = {
    name,
    // Request the full view to include payload data
    view: 'FULL',
  };

  try {
    const [parameterVersion] = await client.getParameterVersion(request);
    console.log(`Parameter version name: ${parameterVersion.name}`);
    if (parameterVersion.createTime) {
      const createTime = new Date(
        parameterVersion.createTime.seconds * 1000 +
          parameterVersion.createTime.nanos / 1000000,
      );
      console.log(`	Create Time: ${createTime}`);
    }
    console.log(`	Disabled: ${parameterVersion.disabled}`);
    if (parameterVersion.kmsKeyVersion) {
      console.log(`	KMS Key Version: ${parameterVersion.kmsKeyVersion}`);
    }
    if (parameterVersion.payload?.data) {
      console.log(
        `	Payload data (base64 encoded): ${parameterVersion.payload.data.toString('base64')}`,
      );
      console.log(
        `	Payload data (UTF-8 decoded): ${parameterVersion.payload.data.toString('utf8')}`,
      );
    } else {
      console.log('	No payload data found.');
    }
    if (parameterVersion.updateTime) {
      const updateTime = new Date(
        parameterVersion.updateTime.seconds * 1000 +
          parameterVersion.updateTime.nanos / 1000000,
      );
      console.log(`	Update Time: ${updateTime}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Parameter version '${parameterVersionId}' for parameter '${parameterId}' ` +
          `in location '${location}' of project '${projectId}' not found.`,
      );
      console.error(
        'Make sure that the parameter ID and version ID are correct and exist.',
      );
    } else {
      console.error(`Error getting parameter version ${name}:`, err);
    }
  }
}
// [END parametermanager_v1_parametermanager_parameterversion_get_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  const parameterId = args[2];
  const parameterVersionId = args[3];
  await getParameterVersion(
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
	- Google Cloud Location like 'us-central1'
	- Your parameter name like 'my-parameter'
	- Your parameter version like '1' or 'latest'

    Usage:

    node parameter-manager-client-parameter-version-get-async.js example-project-168 us-central1 my-parameter 1
  `);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {getParameterVersion};
