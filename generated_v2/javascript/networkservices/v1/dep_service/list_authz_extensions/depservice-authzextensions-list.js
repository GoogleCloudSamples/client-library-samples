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

// [START networkservices_v1_depservice_authzextensions_list]
'use strict';

const {DepServiceClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

/**
 * List authorization extensions in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (for example, 'us-central1')
 */
async function listAuthzExtensions(projectId, locationId) {
  const client = new DepServiceClient();

  try {
    const parent = client.locationPath(projectId, locationId);
    const [response] = await client.listAuthzExtensions({
      parent,
    });

    if (!response || response.length === 0) {
      console.log('No authorization extensions found.');
      return;
    }

    for (const authzExtension of response) {
      console.log(`AuthzExtension name: ${authzExtension.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Specified parent resource was not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Insufficient permissions to list authz extensions:', err.message);
    } else {
      console.error('Error listing authz extensions:', err.message || err);
    }
  }
}

module.exports = { listAuthzExtensions };
// [END networkservices_v1_depservice_authzextensions_list]
