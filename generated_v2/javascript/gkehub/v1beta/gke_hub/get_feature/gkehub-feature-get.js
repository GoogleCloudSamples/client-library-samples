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

// [START gkehub_v1beta_gkehub_feature_get]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the getFeature method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the Feature resource. For GKE Hub, use 'global'.
 * @param {string} featureId - The caller-chosen identifier of the Feature to retrieve (for example, 'servicemesh', 'configmanagement', 'multiclusteringress').
 */
async function getFeature(projectId, locationId, featureId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/features/${featureId}`;

    const [feature] = await client.getFeature({name});

    console.log(`Retrieved feature: ${feature.name}`);
    if (feature.state) {
      console.log(`State code: ${feature.state.state?.code}`);
      console.log(`State description: ${feature.state.state?.description}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Feature not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve feature: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getFeature };
// [END gkehub_v1beta_gkehub_feature_get]
