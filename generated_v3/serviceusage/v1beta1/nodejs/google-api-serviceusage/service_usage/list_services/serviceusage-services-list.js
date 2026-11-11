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

// [START serviceusage_v1beta1_serviceusage_services_list]
'use strict';

const {ServiceUsageClient} = require('@google-cloud/service-usage');
const {status} = require('@grpc/grpc-js');

/**
 * Lists services for a Google Cloud project.
 */
async function listServices() {
  const client = new ServiceUsageClient();
  try {
    const projectId = await client.getProjectId();
    const parent = `projects/${projectId}`;

    // Filter for enabled services to consume the enabled services quota metric.
    const request = {
      parent,
      filter: 'state:ENABLED',
    };

    const [services] = await client.listServices(request);

    for (const service of services) {
      console.log(`Service name: ${service.name}`);
      console.log(`State: ${service.state}`);
    }
  } catch (err) {
    if (err.code === status.RESOURCE_EXHAUSTED) {
      console.error('Resource exhausted while listing services:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while listing services:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else {
      console.error('Failed to list services:', err.message);
    }
  }
}

module.exports = { listServices };
// [END serviceusage_v1beta1_serviceusage_services_list]
