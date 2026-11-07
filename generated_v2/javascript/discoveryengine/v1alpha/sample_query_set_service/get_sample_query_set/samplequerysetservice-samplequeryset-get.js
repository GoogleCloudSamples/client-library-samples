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

// [START discoveryengine_v1alpha_samplequerysetservice_samplequeryset_get]
'use strict';

const {SampleQuerySetServiceClient} =
  require('@google-cloud/discoveryengine').v1alpha;
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a sample query set from Discovery Engine.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId The Google Cloud region (for example, 'us-central1').
 * @param {string} sampleQuerySetId The ID of the sample query set (for example, 'example-sample-query-set-id').
 */
async function getSampleQuerySet(projectId, locationId, sampleQuerySetId) {
  const client = new SampleQuerySetServiceClient({
    apiEndpoint:
      locationId === 'global'
        ? undefined
        : `${locationId}-discoveryengine.googleapis.com`,
  });

  try {
    const name = client.sampleQuerySetPath(
      projectId,
      locationId,
      sampleQuerySetId
    );

    const request = {
      name,
    };

    const [response] = await client.getSampleQuerySet(request);
    console.log(`Sample Query Set Name: ${response.name}`);
    console.log(`Display Name: ${response.displayName}`);
    console.log(`Create Time: ${JSON.stringify(response.createTime)}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Sample query set not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied accessing sample query set.');
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {getSampleQuerySet};
// [END discoveryengine_v1alpha_samplequerysetservice_samplequeryset_get]
