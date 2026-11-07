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

// [START servicemanagement_v1_servicemanager_services_list]
'use strict';

const {ServiceManagerClient} = require('@google-cloud/service-management');
const {status} = require('@grpc/grpc-js');

const client = new ServiceManagerClient();

/**
 * Use the listServices method
 *
 * @param {string} producerProjectId - The ID of the Google Cloud project that produces and owns the services to list. If unspecified, public services and services accessible to the caller are returned.
 */
async function listServices(producerProjectId) {
  try {
    const request = {
      producerProjectId,
    };

    const [services] = await client.listServices(request);

    for (const service of services) {
      console.log(`Service name: ${service.serviceName}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for project ${producerProjectId}: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Project ${producerProjectId} not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list services: ${err.message || err}`);
    }
    throw err;
  }
}

module.exports = { listServices };
// [END servicemanagement_v1_servicemanager_services_list]
