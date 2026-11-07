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

// [START monitoring_v3_servicemonitoringservice_service_create]
'use strict';

const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

/**
 * Creates a service in Cloud Monitoring.
 */
async function createService() {
  const client = new ServiceMonitoringServiceClient();

  const projectIdOrNumber =
    process.env.GOOGLE_CLOUD_PROJECT ||
    (await client.getProjectId().catch(() => 'example-project-id-or-number')) ||
    'example-project-id-or-number';
  const parent = `projects/${projectIdOrNumber}`;
  const service = {
    displayName: 'Example Service',
    custom: {},
  };

  const request = {
    parent,
    service,
  };

  try {
    const [response] = await client.createService(request);
    console.log(`Created service: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service already exists: ${err.message}`);
    } else {
      console.error(`Failed to create service: ${err.message}`);
    }
  }
}

module.exports = {createService};
// [END monitoring_v3_servicemonitoringservice_service_create]
