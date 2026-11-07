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

// [START serviceusage_v1_serviceusage_batch_get_services]
'use strict';

const {ServiceUsageClient} = require('@google-cloud/service-usage');
const {status} = require('@grpc/grpc-js');

const client = new ServiceUsageClient();

/**
 * Use the batchGetServices method
 *
 * @param {string} projectId - The Google Cloud project identifier (or number) from which services are retrieved.
 * @param {string} serviceId - The service identifier (DNS name, e.g., 'serviceusage.googleapis.com') to query.
 */
async function batchGetServices(projectId, serviceId) {
  try {
    const parent = `projects/${projectId}`;
    const serviceName = `projects/${projectId}/services/${serviceId}`;

    const request = {
      parent,
      names: [serviceName],
    };

    const [response] = await client.batchGetServices(request);

    for (const service of response.services || []) {
      console.log(`Service name: ${service.name}`);
      console.log(`State: ${service.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
  }
}

module.exports = { batchGetServices };
// [END serviceusage_v1_serviceusage_batch_get_services]
