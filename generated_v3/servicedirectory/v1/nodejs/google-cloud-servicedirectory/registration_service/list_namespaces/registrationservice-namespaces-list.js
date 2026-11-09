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

// [START servicedirectory_v1_registrationservice_namespaces_list]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Use the listNamespaces method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region, such as 'us-central1' or 'us-east1'.
 */
async function listNamespaces(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [namespaces] = await client.listNamespaces({parent});

    for (const namespace of namespaces) {
      console.log(`Namespace: ${namespace.name}`);
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

module.exports = { listNamespaces };
// [END servicedirectory_v1_registrationservice_namespaces_list]
