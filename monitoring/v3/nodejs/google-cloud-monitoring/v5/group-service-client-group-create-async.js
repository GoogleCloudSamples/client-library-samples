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

// [START monitoring_v3_groupservice_group_create_async]
const {GroupServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new GroupServiceClient();

/**
 * Creates a new monitoring group.
 *
 * A group is a named filter that identifies a collection of monitored resources.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 */
async function createGroupSample(projectId) {
  const request = {
    name: `projects/${projectId}`,
    group: {
      displayName: 'your-new-group-display-name',
      filter: 'resource.type = "gce_instance"',
      isCluster: false, // Set to true if members of this group are considered a cluster
    },
    validateOnly: false,
  };

  try {
    const [response] = await client.createGroup(request);
    console.log(response.name);
    console.log(`	Display Name: ${response.displayName}`);
    console.log(`	Filter: ${response.filter}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Group with display name '${request.group.displayName}' might already exist in project '${projectId}'.`,
      );
      console.log(
        'Please try a different display name or check existing groups.',
      );
    } else {
      console.error('Error creating group:', err.message);
    }
  }
}
// [END monitoring_v3_groupservice_group_create_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await createGroupSample(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify one argument:
  - Google Cloud Project like 'example-project-168'

  Usage:

   node group-service-client-group-create-async.js example-project-168`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {createGroupSample};
