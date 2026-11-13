// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START notebooks_v1_managednotebookservice_runtimes_list]
'use strict';

const {ManagedNotebookServiceClient} = require('@google-cloud/notebooks');
const {status} = require('@grpc/grpc-js');

const client = new ManagedNotebookServiceClient();

/**
 * Use the listRuntimes method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listRuntimes(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const [runtimes] = await client.listRuntimes({
      parent: parent,
    });

    if (!runtimes || runtimes.length === 0) {
      console.log('No runtimes found.');
      return;
    }

    for (const runtime of runtimes) {
      console.log(`Runtime name: ${runtime.name}`);
      console.log(`Runtime state: ${runtime.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
  }
}

module.exports = { listRuntimes };
// [END notebooks_v1_managednotebookservice_runtimes_list]
