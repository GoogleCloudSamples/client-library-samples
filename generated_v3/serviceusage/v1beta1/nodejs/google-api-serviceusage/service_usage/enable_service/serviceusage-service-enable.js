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

// [START serviceusage_v1beta1_serviceusage_enable_service]
'use strict';

const {ServiceUsageClient} = require('@google-cloud/service-usage');
const {status} = require('@grpc/grpc-js');

const client = new ServiceUsageClient();

/**
 * Enables a service for a Google Cloud project.
 */
async function enableService() {
  try {
    const projectId = await client.getProjectId();
    const serviceName = 'compute.googleapis.com';
    const name = `projects/${projectId}/services/${serviceName}`;

    const request = {
      name,
    };

    const [operation] = await client.enableService(request);
    const [response] = await operation.promise();
    console.log(`Service ${response.service.name} state: ${response.service.state}`);
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when attempting to enable the service:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Service or project resource not found:', err.message);
    } else if (err.code !== undefined) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error('An unexpected error occurred:', err.message);
    }
  }
}

module.exports = { enableService };
// [END serviceusage_v1beta1_serviceusage_enable_service]
