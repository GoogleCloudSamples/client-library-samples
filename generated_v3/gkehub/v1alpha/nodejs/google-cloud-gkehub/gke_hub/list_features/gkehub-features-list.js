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

// [START gkehub_v1alpha_gkehub_features_list]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the listFeatures method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID. GKE Hub is currently only available in the 'global' region.
 */
async function listFeatures(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [features] = await client.listFeatures(request);

    for (const feature of features) {
      console.log(`Feature name: ${feature.name}`);
      if (feature.state && feature.state.state) {
        console.log(`Feature state: ${feature.state.state}`);
      }
    }

    return features;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Requested resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing features: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`GKE Hub API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listFeatures };
// [END gkehub_v1alpha_gkehub_features_list]
