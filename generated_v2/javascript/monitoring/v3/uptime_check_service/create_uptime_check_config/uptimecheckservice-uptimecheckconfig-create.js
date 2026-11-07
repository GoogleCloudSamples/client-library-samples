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

// [START monitoring_v3_uptimecheckservice_uptimecheckconfig_create]
'use strict';

const {UptimeCheckServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Creates an uptime check configuration in Cloud Monitoring.
 */
async function createUptimeCheckConfig() {
  try {
    const projectIdOrNumber =
      process.env.GOOGLE_CLOUD_PROJECT ||
      process.env.GCLOUD_PROJECT ||
      (await client.getProjectId());
    const parent = `projects/${projectIdOrNumber}`;
    const uptimeCheckConfig = {
      displayName: 'Example Uptime Check',
      monitoredResource: {
        type: 'uptime_url',
        labels: {
          host: 'example.com',
        },
      },
      httpCheck: {
        path: '/healthz',
        port: 443,
        useSsl: true,
        requestMethod: 'GET',
      },
      period: {
        seconds: 300,
      },
      timeout: {
        seconds: 10,
      },
    };

    const request = {
      parent,
      uptimeCheckConfig,
    };

    const [response] = await client.createUptimeCheckConfig(request);
    console.log(`Created uptime check configuration: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error('Uptime check configuration already exists:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Project or resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to create uptime check configuration:', err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { createUptimeCheckConfig };
// [END monitoring_v3_uptimecheckservice_uptimecheckconfig_create]
