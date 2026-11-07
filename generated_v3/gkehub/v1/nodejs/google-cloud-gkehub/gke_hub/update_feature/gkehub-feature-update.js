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

// [START gkehub_v1_gkehub_feature_update]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the updateFeature method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location for the Feature resource. Feature resources only exist in 'global'.
 * @param {string} featureId - The identifier of the Feature to update (for example, 'multiclusteringress', 'configmanagement').
 */
async function updateFeature(projectId, locationId, featureId) {
  try {
    const name = client.featurePath(projectId, locationId, featureId);
    const updateMask = {
      paths: ['labels'],
    };
    const resource = {
      labels: {
        env: 'prod',
      },
    };

    const request = {
      name,
      updateMask,
      resource,
    };

    const [operation] = await client.updateFeature(request);
    const [response] = await operation.promise();

    console.log(`Updated feature: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Feature resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update feature: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateFeature };
// [END gkehub_v1_gkehub_feature_update]
