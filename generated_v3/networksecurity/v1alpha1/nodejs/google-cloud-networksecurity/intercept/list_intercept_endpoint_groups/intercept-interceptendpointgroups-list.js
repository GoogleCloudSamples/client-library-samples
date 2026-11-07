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

// [START networksecurity_v1alpha1_intercept_interceptendpointgroups_list]
'use strict';

const {v1alpha1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new v1alpha1.InterceptClient();

/**
 * Lists intercept endpoint groups in a specified location.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Location ID (for example, 'global').
 */
async function listInterceptEndpointGroups(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [endpointGroups] = await client.listInterceptEndpointGroups(request);

    if (!endpointGroups || endpointGroups.length === 0) {
      console.log('No intercept endpoint groups found.');
      return;
    }

    for (const endpointGroup of endpointGroups) {
      console.log(`Endpoint group: ${endpointGroup.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listInterceptEndpointGroups };
// [END networksecurity_v1alpha1_intercept_interceptendpointgroups_list]
