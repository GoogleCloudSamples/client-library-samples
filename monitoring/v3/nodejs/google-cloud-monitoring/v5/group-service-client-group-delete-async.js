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

// [START monitoring_v3_groupservice_delete_group_async]
const {GroupServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new GroupServiceClient();

/**
 * Deletes a monitoring group.
 *
 * A group is a named filter that identifies a collection of monitored resources.
 * Deleting a group removes its definition; it does not affect the monitored resources themselves.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id').
 * @param {string} groupId The ID of the group to delete (for example, 'example-group-id').
 */
async function deleteGroup(projectId, groupId = 'example-group-id') {
  const name = client.projectGroupPath(projectId, groupId);

  const request = {
    name,
    recursive: false,
  };

  try {
    await client.deleteGroup(request);
    console.log(`Group '${groupId}' deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Group '${groupId}' not found in project '${projectId}'. ` +
          'Make sure the group ID is correct and the group exists. ' +
          'It may have already been deleted.',
      );
    } else if (
      err.code === status.FAILED_PRECONDITION &&
      err.details &&
      err.details.includes('has children')
    ) {
      console.error(
        `Error: Group '${groupId}' cannot be deleted because it has child groups ` +
          "and 'recursive' was set to false. To delete this group and all its descendants, " +
          `set the 'recursive' parameter to true. Group name: ${name}`,
      );
    } else {
      console.error(`Error deleting group '${groupId}':`, err);
    }
  }
}
// [END monitoring_v3_groupservice_delete_group_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await deleteGroup(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command line, provide the following arguments:
  - Google Cloud Project like 'example-project-168'
  - Group ID like 'example-group-id'

  Usage:

   node group-service-client-group-delete-async.js example-project-168 example-group-id`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteGroup,
};
