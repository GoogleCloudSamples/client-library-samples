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

// [START discoveryengine_v1alpha_samplequerysetservice_samplequeryset_update]
'use strict';

const {v1alpha} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new v1alpha.SampleQuerySetServiceClient();

/**
 * Updates a sample query set.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The geographic location of the sample query set (for example, 'global').
 * @param {string} sampleQuerySetId - The unique identifier of the sample query set to update.
 */
async function updateSampleQuerySet(projectId, locationId, sampleQuerySetId) {
  try {
    const sampleQuerySet = {
      name: `projects/${projectId}/locations/${locationId}/sampleQuerySets/${sampleQuerySetId}`,
      displayName: 'Updated sample query set display name',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      sampleQuerySet,
      updateMask,
    };

    const [response] = await client.updateSampleQuerySet(request);
    console.log(`Updated sample query set: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Sample query set not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateSampleQuerySet };
// [END discoveryengine_v1alpha_samplequerysetservice_samplequeryset_update]
