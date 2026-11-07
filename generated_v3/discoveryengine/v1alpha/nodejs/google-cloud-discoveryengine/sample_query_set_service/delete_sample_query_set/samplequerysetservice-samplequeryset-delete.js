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

// [START discoveryengine_v1alpha_samplequerysetservice_samplequeryset_delete]
'use strict';

const {SampleQuerySetServiceClient} = require('@google-cloud/discoveryengine').v1alpha;
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a sample query set from Discovery Engine.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} sampleQuerySetId - ID of the SampleQuerySet (for example, 'example-samplequeryset-id')
 */
async function deleteSampleQuerySet(projectId, locationId, sampleQuerySetId) {
  const client = new SampleQuerySetServiceClient({
    apiEndpoint:
      locationId === 'global'
        ? 'discoveryengine.googleapis.com'
        : `${locationId}-discoveryengine.googleapis.com`,
  });

  // Construct the resource path for the sample query set
  const name = client.sampleQuerySetPath(
    projectId,
    locationId,
    sampleQuerySetId
  );

  const request = {
    name,
  };

  try {
    await client.deleteSampleQuerySet(request);
    console.log(`Successfully deleted sample query set: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Sample query set not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete sample query set: ${err.message}`);
    }
  }
}

module.exports = { deleteSampleQuerySet };
// [END discoveryengine_v1alpha_samplequerysetservice_samplequeryset_delete]
