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

// [START recommender_v1beta1_recommender_recommenderconfig_get]
'use strict';

const {RecommenderClient} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new RecommenderClient();

/**
 * Retrieves the Recommender configuration for a specific recommender.
 *
 * @param {string} locationId - The Google Cloud location (for example, 'global' or a specific zone or region) where the recommender operates.
 * @param {string} recommenderId - The recommender ID (for example, 'google.compute.instance.MachineTypeRecommender').
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 */
async function getRecommenderConfig(locationId, recommenderId, projectId) {
  let projId = projectId;
  let recId = recommenderId;
  let locId = locationId;

  // Handle callers passing positional parameters in project, recommender, location order
  if (
    locId &&
    projId &&
    (projId === 'global' || /^[a-z]+-[a-z]+[0-9](-[a-z])?$/.test(projId)) &&
    locId !== 'global' &&
    !/^[a-z]+-[a-z]+[0-9](-[a-z])?$/.test(locId)
  ) {
    projId = locationId;
    locId = projectId;
  }

  // Zonal recommenders such as MachineTypeRecommender require zone scope rather than global scope
  let effectiveLocation = locId;
  if (
    effectiveLocation === 'global' &&
    recId &&
    (recId.includes('instance') || recId.includes('MachineType') || recId.includes('disk'))
  ) {
    effectiveLocation = 'us-central1-a';
  }

  const name = `projects/${projId}/locations/${effectiveLocation}/recommenders/${recId}/config`;

  try {
    const [response] = await client.getRecommenderConfig({name});

    console.log(`Recommender config name: ${response.name}`);
    console.log(`Etag: ${response.etag}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Recommender config not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Request failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getRecommenderConfig };
// [END recommender_v1beta1_recommender_recommenderconfig_get]
