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

// [START servicedirectory_v1beta1_registrationservice_namespace_create]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Creates a Service Directory namespace in a specified location.
 *
 * @param {string} namespaceId - ID of the Namespace (for example, 'example-namespace-id')
 */
async function createNamespace(namespaceId) {
  try {
    const projectId = await client.getProjectId();
    const locationId = 'us-central1';

    // Construct the parent path from resource identifiers.
    const parent = client.locationPath(projectId, locationId);
    const namespace = {
      labels: {
        stage: 'production',
      },
    };

    const request = {
      parent,
      namespaceId,
      namespace,
    };

    const [response] = await client.createNamespace(request);
    console.log(`Created namespace: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Namespace ${namespaceId} already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating namespace: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for namespace: ${err.message}`);
    } else {
      console.error(`Registration service error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createNamespace };
// [END servicedirectory_v1beta1_registrationservice_namespace_create]
