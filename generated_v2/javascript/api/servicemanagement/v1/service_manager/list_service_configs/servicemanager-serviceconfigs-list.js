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

// [START servicemanagement_v1_servicemanager_serviceconfigs_list]
'use strict';

const {ServiceManagerClient} = require('@google-cloud/service-management');
const {status} = require('@grpc/grpc-js');

const client = new ServiceManagerClient();

/**
 * Use the listServiceConfigs method
 *
 * @param {string} serviceName - The name of the service whose configurations to list (caller-chosen during service creation, for example 'example.googleapis.com').
 */
async function listServiceConfigs(serviceName) {
  try {
    const request = {
      serviceName,
    };

    const [serviceConfigs] = await client.listServiceConfigs(request);
    for (const config of serviceConfigs) {
      console.log(`Service configuration ID: ${config.id}`);
      console.log(`Title: ${config.title}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${serviceName}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing service: ${serviceName}`);
    } else {
      console.error(`Service Management API error: ${err.message}`);
    }
  }
}

module.exports = { listServiceConfigs };
// [END servicemanagement_v1_servicemanager_serviceconfigs_list]
