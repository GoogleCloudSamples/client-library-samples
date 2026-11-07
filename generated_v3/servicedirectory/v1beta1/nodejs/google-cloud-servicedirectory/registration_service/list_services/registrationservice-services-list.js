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

// [START servicedirectory_v1beta1_registrationservice_services_list]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Use the listServices method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the namespace (for example, 'us-central1').
 * @param {string} namespaceId - The caller-chosen resource ID of the parent namespace.
 */
async function listServices(projectId, locationId, namespaceId) {
  try {
    const parent = client.namespacePath(projectId, locationId, namespaceId);
    const [services] = await client.listServices({parent});

    for (const service of services) {
      console.log(`Service name: ${service.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else {
      console.error('API error encountered:', err.message);
    }
  }
}

module.exports = { listServices };
// [END servicedirectory_v1beta1_registrationservice_services_list]
