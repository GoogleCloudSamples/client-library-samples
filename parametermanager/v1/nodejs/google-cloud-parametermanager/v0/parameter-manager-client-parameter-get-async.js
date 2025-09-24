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

// [START parametermanager_v1_parametermanager_parameter_get_async]
const {ParameterManagerClient} = require('@google-cloud/parametermanager').v1;
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Gets details of a single Parameter.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'my-project-123')
 * @param {string} location The Google Cloud location (for example, 'us-central1')
 * @param {string} parameterId The ID of the parameter to retrieve (for example, 'my-parameter')
 */
async function getParameter(
  projectId,
  location = 'us-central1',
  parameterId = 'my-parameter',
) {
  const name = `projects/${projectId}/locations/${location}/parameters/${parameterId}`;

  const request = {
    name,
  };

  try {
    const [parameter] = await client.getParameter(request);
    console.log(`Successfully retrieved parameter: ${parameter.name}`);
    if (parameter.createTime) {
      const createTime = new Date(
        parameter.createTime.seconds * 1000 +
          parameter.createTime.nanos / 1000000,
      );
      console.log(`	Create Time: ${createTime}`);
    }
    if (parameter.format) {
      console.log(`	Format: ${parameter.format}`);
    }
    if (parameter.kmsKey) {
      console.log(`	KMS Key: ${parameter.kmsKey}`);
    }
    if (parameter.updateTime) {
      const updateTime = new Date(
        parameter.updateTime.seconds * 1000 +
          parameter.updateTime.nanos / 1000000,
      );
      console.log(`	Update Time: ${updateTime}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Parameter ${parameterId} not found in location ${location} of project ${projectId}.`,
      );
      console.error(
        'Please make sure the parameter ID, location, and project ID are correct.',
      );
    } else {
      console.error('Error getting parameter:', err.message);
    }
  }
}
// [END parametermanager_v1_parametermanager_parameter_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }

  const projectId = args[0];
  const location = args[1];
  const parameterId = args[2];

  await getParameter(projectId, location, parameterId);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
	- Google Cloud Project like 'example-project-168'
	- Google Cloud Location like 'us-central1'
	- Resource name like 'example-resource-id'

Usage:

 node parameter-manager-client-parameter-get-async.js example-project-168 us-central1 example-resource-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {getParameter};
