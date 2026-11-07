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

// [START serviceusage_v1_serviceusage_service_get]
'use strict';

const {ServiceUsageClient} = require('@google-cloud/service-usage');
const {status} = require('@grpc/grpc-js');

const client = new ServiceUsageClient();

/**
 * Gets details about a specific service for a Google Cloud project.
 */
async function getService() {
  const projectId = await client.getProjectId();
  const serviceName = 'compute.googleapis.com';
  const name = `projects/${projectId}/services/${serviceName}`;

  const request = {
    name,
  };

  try {
    const [response] = await client.getService(request);
    console.log(`Service name: ${response.name}`);
    console.log(`State: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service or project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing service: ${err.message}`);
    } else {
      console.error(`Failed to get service details: ${err.message}`);
    }
  }
}

module.exports = {getService};
// [END serviceusage_v1_serviceusage_service_get]
