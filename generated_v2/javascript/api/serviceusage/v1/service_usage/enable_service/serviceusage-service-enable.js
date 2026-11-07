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

// [START serviceusage_v1_serviceusage_enable_service]
'use strict';

const {ServiceUsageClient} = require('@google-cloud/service-usage');
const {status} = require('@grpc/grpc-js');

const client = new ServiceUsageClient();

/**
 * Use the enableService method
 *
 * @param {string} projectId - The Google Cloud project ID on which to enable the service.
 * @param {string} serviceId - The identifier/DNS name of the service to enable (for example, 'serviceusage.googleapis.com').
 */
async function enableService(projectId, serviceId) {
  try {
    const name = `projects/${projectId}/services/${serviceId}`;

    // Initiates the long-running operation to enable the service
    const [operation] = await client.enableService({
      name,
    });

    // Waits for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Service enabled successfully: ${response.service?.name || name}`);
    if (response.service?.state) {
      console.log(`Service state: ${response.service.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service already enabled: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Non-API error: ${err.message}`);
    }
  }
}

module.exports = { enableService };
// [END serviceusage_v1_serviceusage_enable_service]
