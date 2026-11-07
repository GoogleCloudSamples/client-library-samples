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

// [START servicedirectory_v1_registrationservice_namespace_create]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Use the createNamespace method
 *
 * @param {string} namespaceId - The resource ID for the namespace to be created.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID (for example, 'us-central1').
 */
async function createNamespace(namespaceId, projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const namespace = {
      labels: {
        env: 'test',
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
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Google API error (${err.code}): ${err.message}`);
      throw err;
    }
  }
}

module.exports = { createNamespace };
// [END servicedirectory_v1_registrationservice_namespace_create]
