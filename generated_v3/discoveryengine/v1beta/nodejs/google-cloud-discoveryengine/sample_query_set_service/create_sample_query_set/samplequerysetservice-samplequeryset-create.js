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

// [START discoveryengine_v1beta_samplequerysetservice_samplequeryset_create]
'use strict';

const {SampleQuerySetServiceClient} = require('@google-cloud/discoveryengine').v1beta;
const {status} = require('@grpc/grpc-js');

const client = new SampleQuerySetServiceClient();

/**
 * Creates a sample query set in Google Cloud Discovery Engine.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'global')
 * @param {string} sampleQuerySetId - ID of the SampleQuerySet (for example, 'example-sample-query-set-id')
 */
async function createSampleQuerySet(projectId, locationId, sampleQuerySetId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const sampleQuerySet = {
      displayName: 'Example Sample Query Set',
    };

    const request = {
      parent,
      sampleQuerySet,
      sampleQuerySetId,
    };

    const [response] = await client.createSampleQuerySet(request);
    console.log(`Created sample query set: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Sample query set already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create sample query set: ${err.message}`);
    }
  }
}

module.exports = { createSampleQuerySet };
// [END discoveryengine_v1beta_samplequerysetservice_samplequeryset_create]
