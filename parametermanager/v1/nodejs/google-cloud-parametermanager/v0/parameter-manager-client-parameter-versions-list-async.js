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
const {status} = require('@grpc/grpc-js');

// [START parametermanager_v1_parametermanager_parameterversions_list_async]
const {ParameterManagerClient} = require('@google-cloud/parametermanager').v1;

const client = new ParameterManagerClient();

/**
 * Lists all parameter versions for a given parameter in a project and location.
 *
 * This function demonstrates how to retrieve a paginated list of parameter versions
 * associated with a specific parameter. It iterates through all available pages
 * to ensure all versions are listed.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'your-project-id')
 * @param {string} locationId The Google Cloud location (for example, 'global' or 'us-central1')
 * @param {string} parameterId The ID of the parameter (for example, 'my-parameter')
 */
async function listParameterVersions(
  projectId,
  locationId = 'us-central1',
  parameterId = 'my-parameter',
) {
  const parent = client.parameterPath(projectId, locationId, parameterId);

  const request = {
    parent,
    pageSize: 10,
  };

  try {
    const [parameterVersions] = await client.listParameterVersions(request);

    if (parameterVersions.length === 0) {
      console.log(
        `No parameter versions found for parameter '${parameterId}' in location '${locationId}' of project '${projectId}'.`,
      );
      return;
    }

    console.log(
      `Parameter versions for parameter '${parameterId}' in location '${locationId}' of project '${projectId}':`,
    );
    for (const version of parameterVersions) {
      console.log(`- Version Name: ${version.name}`);
      if (version.createTime) {
        const createTime = new Date(
          version.createTime.seconds * 1000 +
            version.createTime.nanos / 1000000,
        );
        console.log(`	Create Time: ${createTime}`);
      }
      console.log(`	Disabled: ${version.disabled}`);
      // Note: The payload content is not returned in BASIC view by default.
      // To get the payload, use getParameterVersion with View.FULL.
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified parameter '${parameterId}' or its parent location/project was not found.`,
      );
      console.error(
        'Please make sure the project ID, location ID, and parameter ID are correct.',
      );
    } else {
      console.error('Error listing parameter versions:', err);
    }
  }
}
// [END parametermanager_v1_parametermanager_parameterversions_list_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const locationId = args[1];
  const parameterId = args[2];
  await listParameterVersions(projectId, locationId, parameterId);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
	- Google Cloud Project ID
	- Google Cloud Location (e.g., 'global' or 'us-central1')
	- Parameter ID (e.g., 'my-parameter')

Usage:
	node parameter-manager-client-parameter-versions-list-async.js <projectId> <locationId> <parameterId>

Example:
	node parameter-manager-client-parameter-versions-list-async.js my-gcp-project global my-test-parameter
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listParameterVersions,
};
