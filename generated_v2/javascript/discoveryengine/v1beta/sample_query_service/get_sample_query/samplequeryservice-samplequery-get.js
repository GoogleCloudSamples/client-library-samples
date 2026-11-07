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

// [START discoveryengine_v1beta_samplequeryservice_samplequery_get]
'use strict';

const {SampleQueryServiceClient} = require('@google-cloud/discoveryengine').v1beta;
const {status} = require('@grpc/grpc-js');

const client = new SampleQueryServiceClient();

/**
 * Retrieves a sample query from a sample query set.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location (for example, 'global').
 * @param {string} sampleQuerySetId - The ID of the SampleQuerySet (for example, 'example-samplequery-set-id').
 * @param {string} sampleQueryId - The ID of the SampleQuery to retrieve (for example, 'example-samplequery-id').
 */
async function getSampleQuery(projectId, locationId, sampleQuerySetId, sampleQueryId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/sampleQuerySets/${sampleQuerySetId}/sampleQueries/${sampleQueryId}`;

    const request = {
      name,
    };

    const [response] = await client.getSampleQuery(request);

    console.log(`Sample query name: ${response.name}`);
    if (response.queryEntry?.query) {
      console.log(`Query text: ${response.queryEntry.query}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Sample query not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getSampleQuery };
// [END discoveryengine_v1beta_samplequeryservice_samplequery_get]
