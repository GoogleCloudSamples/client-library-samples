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

// [START datastream_v1alpha1_datastream_privateconnection_delete]
'use strict';

const {DatastreamClient} = require('@google-cloud/datastream');
const {status} = require('@grpc/grpc-js');

const client = new DatastreamClient();

/**
 * Deletes a private connection in Datastream.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region of the private connection.
 * @param {string} privateConnectionId - The identifier of the private connection.
 */
async function deletePrivateConnection(projectId, locationId, privateConnectionId) {
  try {
    const name = client.privateConnectionPath(
      projectId,
      locationId,
      privateConnectionId
    );

    // Initiates the long-running operation to delete the private connection
    const [operation] = await client.deletePrivateConnection({name});

    console.log(`Deleted private connection: ${name}`);
    return operation;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Private connection not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Failed precondition: ${err.message}`);
    } else {
      console.error(`Operation failed with gRPC status ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deletePrivateConnection };
// [END datastream_v1alpha1_datastream_privateconnection_delete]
