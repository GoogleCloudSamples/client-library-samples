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

// [START discoveryengine_v1alpha_samplequeryservice_samplequery_update]
'use strict';

const {SampleQueryServiceClient} = require('@google-cloud/discoveryengine').v1alpha;
const {status} = require('@grpc/grpc-js');

const client = new SampleQueryServiceClient();

/**
 * Updates a sample query in a sample query set.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID, such as `global`.
 * @param {string} sampleQuerySetId - The ID of the parent sample query set.
 * @param {string} sampleQueryId - The ID of the sample query to update.
 */
async function updateSampleQuery(projectId, locationId, sampleQuerySetId, sampleQueryId) {
  try {
    const sampleQuery = {
      name: `projects/${projectId}/locations/${locationId}/sampleQuerySets/${sampleQuerySetId}/sampleQueries/${sampleQueryId}`,
      queryEntry: {
        query: 'updated search query',
      },
    };

    const updateMask = {
      paths: ['query_entry'],
    };

    const request = {
      sampleQuery,
      updateMask,
    };

    const [response] = await client.updateSampleQuery(request);
    console.log(`Updated sample query: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Sample query not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update sample query: ${err.message}`);
    }
  }
}

module.exports = { updateSampleQuery };
// [END discoveryengine_v1alpha_samplequeryservice_samplequery_update]
