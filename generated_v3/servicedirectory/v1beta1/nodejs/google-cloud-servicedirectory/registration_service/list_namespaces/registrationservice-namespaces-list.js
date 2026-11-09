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

// [START servicedirectory_v1beta1_registrationservice_namespaces_list]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Lists Service Directory namespaces in a given project and location.
 */
async function listNamespaces() {
  try {
    const projectId = await client.getProjectId();
    const locationId = 'us-central1';
    const parent = client.locationPath(projectId, locationId);

    const request = {
      parent,
    };

    const [namespaces] = await client.listNamespaces(request);
    for (const item of namespaces) {
      console.log(`Namespace: ${item.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error listing namespaces: ${err.message}`);
    }
  }
}

module.exports = { listNamespaces };
// [END servicedirectory_v1beta1_registrationservice_namespaces_list]
