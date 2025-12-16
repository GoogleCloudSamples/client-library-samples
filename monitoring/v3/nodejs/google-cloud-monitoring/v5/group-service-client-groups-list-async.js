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

// [START monitoring_v3_groupservice_groups_list_async]
const {GroupServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new GroupServiceClient();

/**
 * Lists all groups in a Google Cloud project.
 *
 * Groups in Google Cloud Monitoring are named filters used to identify collections
 * of monitored resources. This function demonstrates how to retrieve a list of
 * these groups associated with a specific project.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'your-project-123').
 */
async function listGroups(projectId) {
  const request = {
    name: `projects/${projectId}`,
  };

  try {
    const [groups] = await client.listGroups(request);

    if (groups.length === 0) {
      console.log(`No groups found in project ${projectId}.`);
      return;
    }

    console.log(`Groups in project ${projectId}:`);
    for (const group of groups) {
      console.log(`	Name: ${group.name}`);
      console.log(`	Display Name: ${group.displayName || 'N/A'}`);
      console.log(`	Filter: ${group.filter || 'N/A'}`);
      console.log(`	Is Cluster: ${group.isCluster}`);
      if (group.parentName) {
        console.log(`	Parent: ${group.parentName}`);
      }
      console.log('');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' not found or you do not have permission to access it.`,
      );
      console.error(
        'Make sure the project ID is correct and you have the necessary IAM permissions (for example, Monitoring Viewer).' +
          ' If using the default projectId, replace it with a valid project ID.',
      );
    } else {
      console.error(
        'An unexpected error occurred while listing groups:',
        err.message,
      );
    }
  }
}
// [END monitoring_v3_groupservice_groups_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await listGroups(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command line, provide the following argument:
  - Google Cloud Project like 'example-project-168'

  Usage:

   node group-service-client-groups-list-async.js example-project-168`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listGroups,
};
