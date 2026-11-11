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

// [START serviceusage_v1beta1_serviceusage_disable_service]
'use strict';

const {ServiceUsageClient} = require('@google-cloud/service-usage');
const {status} = require('@grpc/grpc-js');

const client = new ServiceUsageClient();

/**
 * Disables a service for a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID or project number for which to disable the service.
 * @param {string} serviceId - The identifier of the service to disable (for example, 'serviceusage.googleapis.com').
 */
async function disableService(projectId, serviceId) {
  try {
    const name = `projects/${projectId}/services/${serviceId}`;
    const request = {
      name,
    };

    // DisableService initiates a long-running operation.
    const [operation] = await client.disableService(request);
    const [response] = await operation.promise();

    console.log(`Disabled service: ${response.service?.name ?? name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (typeof err.code === 'number') {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { disableService };
// [END serviceusage_v1beta1_serviceusage_disable_service]
