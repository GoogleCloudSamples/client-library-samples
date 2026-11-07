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

// [START serviceusage_v1beta1_serviceusage_batch_enable_services]
'use strict';

const {ServiceUsageClient} = require('@google-cloud/service-usage');
const {status} = require('@grpc/grpc-js');

const client = new ServiceUsageClient();

/**
 * Enables multiple services on a Google Cloud project asynchronously.
 */
async function batchEnableServices() {
  try {
    const projectId = await client.getProjectId();
    const parent = `projects/${projectId}`;
    const serviceIds = ['compute.googleapis.com', 'storage.googleapis.com'];

    const request = {
      parent,
      serviceIds,
    };

    const [operation] = await client.batchEnableServices(request);
    const [response] = await operation.promise();
    console.log(`Batch enable services completed successfully: ${JSON.stringify(response)}`);
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while enabling services:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided in request:', err.message);
    } else {
      console.error('Batch service enablement failed:', err.message || err);
    }
  }
}

module.exports = { batchEnableServices };
// [END serviceusage_v1beta1_serviceusage_batch_enable_services]
