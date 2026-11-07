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

// [START servicedirectory_v1beta1_registrationservice_namespace_update]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Use the updateNamespace method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the namespace.
 * @param {string} namespaceId - The ID of the Service Directory namespace to update.
 */
async function updateNamespace(projectId, locationId, namespaceId) {
  try {
    const namespace = {
      name: client.namespacePath(projectId, locationId, namespaceId),
      labels: {
        env: 'sample',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    const [response] = await client.updateNamespace({
      namespace,
      updateMask,
    });

    console.log(`Updated namespace: ${response.name}`);
    console.log(`Labels: ${JSON.stringify(response.labels)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Namespace not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`RPC failed: ${err.message}`);
    }
  }
}

module.exports = { updateNamespace };
// [END servicedirectory_v1beta1_registrationservice_namespace_update]
