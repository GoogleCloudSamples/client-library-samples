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

// [START gkehub_v1alpha_gkehub_feature_delete]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the deleteFeature method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location for the Feature resource.
 * @param {string} featureId - The ID of the Feature to delete.
 */
async function deleteFeature(projectId, locationId, featureId) {
  try {
    const name = client.featurePath(projectId, locationId, featureId);
    const [operation] = await client.deleteFeature({name});
    const [response] = await operation.promise();

    console.log(`Deleted Feature: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Feature not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Error deleting feature: ${err.message}`);
    }
  }
}

module.exports = { deleteFeature };
// [END gkehub_v1alpha_gkehub_feature_delete]
