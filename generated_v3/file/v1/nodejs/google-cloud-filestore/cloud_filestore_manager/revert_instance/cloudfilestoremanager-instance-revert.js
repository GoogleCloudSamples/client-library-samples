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

// [START file_v1_cloudfilestoremanager_revert_instance]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Use the revertInstance method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud zone where the Filestore instance is located (for example, 'us-central1-c').
 * @param {string} instanceId - The ID of the Filestore instance to revert (for example, 'my-filestore-instance').
 * @param {string} targetSnapshotId - The ID of the snapshot to revert the instance to (for example, 'my-snapshot').
 */
async function revertInstance(projectId, locationId, instanceId, targetSnapshotId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/instances/${instanceId}`;
    const request = {
      name,
      targetSnapshotId,
    };

    // RevertInstance initiates a long-running operation
    const [operation] = await client.revertInstance(request);
    const [response] = await operation.promise();

    console.log(`Reverted instance: ${response.name}`);
    console.log(`Instance state: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.details || err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation precondition failed: ${err.details || err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Resource conflict: ${err.details || err.message}`);
    } else if (err.code) {
      console.error(`Filestore API error [${err.code}]: ${err.details || err.message}`);
    } else {
      console.error(`Non-API error encountered: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { revertInstance };
// [END file_v1_cloudfilestoremanager_revert_instance]
