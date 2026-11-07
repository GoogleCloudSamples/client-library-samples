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

// [START gkehub_v1beta_gkehub_feature_update]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the updateFeature method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the Feature resource. For GKE Hub, this must be 'global'.
 * @param {string} featureId - The ID of the Feature to update (e.g., 'multiclusteringress', 'servicemesh', 'configmanagement').
 */
async function updateFeature(projectId, locationId, featureId) {
  try {
    const updateMask = {
      paths: ['labels'],
    };
    const resource = {
      labels: {
        env: 'staging',
      },
    };

    const name = `projects/${projectId}/locations/${locationId}/features/${featureId}`;

    const request = {
      name,
      updateMask,
      resource,
    };

    // UpdateFeature initiates a long-running operation
    const [operation] = await client.updateFeature(request);
    const [response] = await operation.promise();

    console.log(`Updated Feature: ${response.name}`);
    console.log('Feature labels:', response.labels);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Specified Feature was not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateFeature };
// [END gkehub_v1beta_gkehub_feature_update]
