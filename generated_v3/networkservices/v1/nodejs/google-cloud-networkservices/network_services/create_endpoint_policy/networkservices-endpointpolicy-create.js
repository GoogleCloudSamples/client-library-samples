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

// [START networkservices_v1_networkservices_endpointpolicy_create]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Creates a Network Services EndpointPolicy resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} endpointPolicyId - ID of the EndpointPolicy (for example, 'example-endpointpolicy-id')
 */
async function createEndpointPolicy(projectId, locationId, endpointPolicyId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const endpointPolicy = {
      type: 'SIDECAR_PROXY',
      endpointMatcher: {
        metadataLabelMatcher: {
          metadataLabelMatchCriteria: 'MATCH_ALL',
          metadataLabels: [
            {
              labelName: 'env',
              labelValue: 'prod',
            },
          ],
        },
      },
    };

    const request = {
      parent,
      endpointPolicyId,
      endpointPolicy,
    };

    const [operation] = await client.createEndpointPolicy(request);
    const [response] = await operation.promise();

    console.log(`Endpoint policy created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Endpoint policy ${endpointPolicyId} already exists.`);
    } else {
      console.error('Failed to create endpoint policy:', err);
    }
  }
}

module.exports = { createEndpointPolicy };
// [END networkservices_v1_networkservices_endpointpolicy_create]
