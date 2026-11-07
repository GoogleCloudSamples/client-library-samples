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

// [START osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliances_list]
'use strict';

const {v1alpha} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new v1alpha.OsConfigZonalServiceClient();

/**
 * Lists OS policy compliances for VM instances in a given location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud zone or location ID (for example, 'us-central1-a').
 */
async function listInstanceOsPoliciesCompliances(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [response] = await client.listInstanceOSPoliciesCompliances(request);
    const compliances = Array.isArray(response)
      ? response
      : response.instanceOsPoliciesCompliances || [];

    if (compliances.length === 0) {
      console.log('No OS policy compliances found.');
    } else {
      for (const compliance of compliances) {
        console.log(`Instance: ${compliance.instance}`);
        console.log(`Compliance State: ${compliance.state}`);
        console.log(`Resource: ${compliance.name}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target location or project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Insufficient permissions to list OS policy compliances: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list OS policy compliances: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listInstanceOsPoliciesCompliances };
// [END osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliances_list]
