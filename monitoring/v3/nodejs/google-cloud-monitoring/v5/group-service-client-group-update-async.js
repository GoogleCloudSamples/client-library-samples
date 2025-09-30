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

// [START monitoring_v3_groupservice_group_update_async]
const {GroupServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new GroupServiceClient();

/**
 * Updates an existing Monitoring group. This sample demonstrates how to update
 * the display name, filter, and cluster status of a group.
 *
 * A group is a named filter that identifies a collection of monitored resources.
 * Updating a group allows you to change its properties, such as its display name,
 * the filter that determines its members, and whether it's considered a cluster.
 * This can be useful for refining resource collections or adjusting how they are
 * monitored.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} groupId The ID of the group to update (for example, 'your-instance-group')
 */
async function updateGroup(projectId, groupId = 'your-instance-group') {
  const groupName = client.projectGroupPath(projectId, groupId);

  const group = {
    name: groupName,
    displayName: 'Updated VM Instance Group',
    filter: 'resource.type = "gce_instance"',
    isCluster: true,
  };

  const request = {
    group,
  };

  try {
    const [updatedGroup] = await client.updateGroup(request);
    console.log(updatedGroup.name);
    console.log(`	Display Name: ${updatedGroup.displayName}`);
    console.log(`	Filter: ${updatedGroup.filter}`);
    console.log(`	Is Cluster: ${updatedGroup.isCluster}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Group '${groupId}' not found in project '${projectId}'. ` +
          'Make sure the group ID and project ID are correct and the group exists.',
      );
    } else {
      console.error('Failed to update group:', err.message);
    }
  }
}
// [END monitoring_v3_groupservice_group_update_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await updateGroup(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Group ID like 'your-instance-group'

  Usage:

   node group-service-client-group-update-async.js example-project-168 your-instance-group`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {updateGroup};
