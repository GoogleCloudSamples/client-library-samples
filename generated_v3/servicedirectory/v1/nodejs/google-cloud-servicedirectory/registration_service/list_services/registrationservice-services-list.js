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

// [START servicedirectory_v1_registrationservice_services_list]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Lists Service Directory services in a specified namespace.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location (for example, 'us-central1').
 * @param {string} namespaceId - The ID of the Service Directory namespace whose services to list.
 */
async function listServices(projectId, locationId, namespaceId) {
  try {
    const parent = client.namespacePath(projectId, locationId, namespaceId);
    const request = {
      parent,
    };

    const [services] = await client.listServices(request);

    for (const service of services) {
      console.log(`Service name: ${service.name}`);
    }

    return services;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Namespace not found: projects/${projectId}/locations/${locationId}/namespaces/${namespaceId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing namespace: projects/${projectId}/locations/${locationId}/namespaces/${namespaceId}`);
    } else {
      console.error(`Service Directory API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listServices };
// [END servicedirectory_v1_registrationservice_services_list]
