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

// [START networkservices_v1beta1_networkservices_endpointpolicy_create]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the createEndpointPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} endpointPolicyId - The caller-chosen unique identifier for the EndpointPolicy.
 * @param {string} locationId - The Google Cloud location ID (must be 'global').
 */
async function createEndpointPolicy(projectId, endpointPolicyId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const metadataLabelMatcher = {
      metadataLabelMatchCriteria: 'MATCH_ANY',
      metadataLabels: [
        {
          labelName: 'env',
          labelValue: 'prod',
        },
      ],
    };

    const endpointPolicy = {
      type: 'SIDECAR_PROXY',
      endpointMatcher: {
        metadataLabelMatcher,
      },
    };

    const request = {
      parent,
      endpointPolicyId,
      endpointPolicy,
    };

    // Initialize the long-running operation to create the endpoint policy
    const [operation] = await client.createEndpointPolicy(request);

    // Wait for the operation to complete
    const [response] = await operation.promise();
    console.log(`Endpoint Policy created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Endpoint Policy already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createEndpointPolicy };
// [END networkservices_v1beta1_networkservices_endpointpolicy_create]
