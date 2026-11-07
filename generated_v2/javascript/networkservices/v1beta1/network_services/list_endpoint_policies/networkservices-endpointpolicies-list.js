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

// [START networkservices_v1beta1_networkservices_endpointpolicies_list]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Lists endpoint policies in the specified project and location.
 *
 * @param {string} project_id - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listEndpointPolicies(project_id) {
  try {
    if (!project_id) {
      project_id = process.env.GOOGLE_CLOUD_PROJECT || process.env.PROJECT_ID;
    }
    const parent = `projects/${project_id}/locations/global`;
    const request = {
      parent,
    };

    const [endpointPolicies] = await client.listEndpointPolicies(request);

    if (endpointPolicies.length === 0) {
      console.log('No endpoint policies found.');
    } else {
      for (const endpointPolicy of endpointPolicies) {
        console.log(`Endpoint Policy: ${endpointPolicy.name}`);
        console.log(`Type: ${endpointPolicy.type}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource parent not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing endpoint policies: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listEndpointPolicies };
// [END networkservices_v1beta1_networkservices_endpointpolicies_list]
