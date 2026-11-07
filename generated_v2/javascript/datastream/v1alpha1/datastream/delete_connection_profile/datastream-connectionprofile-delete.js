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

// [START datastream_v1alpha1_datastream_connectionprofile_delete]
'use strict';

const {DatastreamClient} = require('@google-cloud/datastream');
const {status} = require('@grpc/grpc-js');

const client = new DatastreamClient();

/**
 * Use the deleteConnectionProfile method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the connection profile (for example, 'us-central1').
 * @param {string} connectionProfileId - The ID of the Datastream connection profile to delete.
 */
async function deleteConnectionProfile(projectId, locationId, connectionProfileId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/connectionProfiles/${connectionProfileId}`;

    const request = {
      name,
    };

    // DeleteConnectionProfile starts a long-running operation.
    const [operation] = await client.deleteConnectionProfile(request);
    console.log(`Deletion operation started: ${operation.name}`);

    // Wait for the operation to complete.
    const [response] = await operation.promise();
    console.log(`Successfully deleted connection profile: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection profile not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation failed precondition: ${err.message}`);
    } else {
      console.error(`API request failed with error code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteConnectionProfile };
// [END datastream_v1alpha1_datastream_connectionprofile_delete]
