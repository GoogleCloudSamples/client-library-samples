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

// [START networkconnectivity_v1_internalrangeservice_internalrange_delete]
'use strict';

const {InternalRangeServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new InternalRangeServiceClient();

/**
 * Use the deleteInternalRange method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region or global) for the internal range.
 * @param {string} internalRangeId - The resource ID of the internal range to delete.
 */
async function deleteInternalRange(projectId, locationId, internalRangeId) {
  const name = `projects/${projectId}/locations/${locationId}/internalRanges/${internalRangeId}`;

  try {
    const request = {
      name,
    };

    const [operation] = await client.deleteInternalRange(request);
    console.log(`Delete operation started for internal range: ${name}`);

    // Wait for the long-running operation to complete.
    await operation.promise();
    console.log(`Internal range successfully deleted: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Internal range not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Internal range cannot be deleted because it is currently referenced: ${err.message}`);
    } else {
      console.error(`Error deleting internal range: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteInternalRange };
// [END networkconnectivity_v1_internalrangeservice_internalrange_delete]
