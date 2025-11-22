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

// [START monitoring_v3_groupservice_group_get_async]
const {GroupServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new GroupServiceClient();

/**
 * Gets a single group by its ID.
 *
 * A group is a named filter that is used to identify a collection of monitored resources.
 * This sample demonstrates how to retrieve the details of a specific group.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} groupId The ID of the group to retrieve (for example, 'your-group-id')
 */
async function getGroup(projectId, groupId = 'your-group-id') {
  const name = client.projectGroupPath(projectId, groupId);

  const request = {
    name,
  };

  try {
    const [group] = await client.getGroup(request);
    console.log(group.name);
    console.log(`	Display Name: ${group.displayName}`);
    console.log(`	Filter: ${group.filter}`);
    console.log(`	Is Cluster: ${group.isCluster}`);
    if (group.parentName) {
      console.log(`	Parent Name: ${group.parentName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Group '${groupId}' not found in project '${projectId}'. ` +
          'Make sure the group ID is correct and exists.',
      );
    } else {
      console.error('Error getting group:', err.message);
    }
  }
}
// [END monitoring_v3_groupservice_group_get_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getGroup(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Group ID like 'example-group-id'

  Usage:

   node group-service-client-group-get-async.js example-project-168 example-group-id`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {getGroup};
